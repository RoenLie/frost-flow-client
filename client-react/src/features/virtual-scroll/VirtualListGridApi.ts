import { createCSSSelector } from "shared/helpers/createCSSSelector";
import { Publisher } from "shared/helpers/publisher";
import { debounce } from "shared/helpers/debounce";


export type TSuccessParams = {
   rowData: any[],
   lastRow: number;
};
export type TRequest = {
   startRow: number;
   endRow?: number;
   filterModel?: any;
   groupKeys?: any[];
   pivotCols?: any[];
   pivotMode?: boolean;
   rowGroupCols?: any[];
   sortModel?: any[];
   valueCols?: any[];
};
export interface IGetRowsParams {
   request: TRequest;
   fail: () => void;
   success: ( { rowData, lastRow }: TSuccessParams ) => void;
}
export interface IDatasource {
   getRows: ( { }: IGetRowsParams ) => Promise<any>;
}
export type TDatasourceOptions = {
   batchSize: number;
};
export interface ISSROptions {
   [ key: string ]: any;
}
export interface IDefaultColDefs {
   [ key: string ]: any;
}
export interface IColDefs {
   [ key: string ]: any;
   label: string;
   field: string;
   minWidth?: number;
   resizable?: boolean;
   moveable?: boolean;
   menu?: boolean;
}

type ListGridMode = 'ssr' | 'normal';
interface FlexibleHTMLElement extends HTMLElement { [ key: string ]: any; };
type TEventSubscription = [ FlexibleHTMLElement | Window, keyof WindowEventMap, any ][];
class EventApi {
   subscriptions: TEventSubscription = [];
   subscribe() {
      this.subscriptions.forEach( ( sub ) => sub[ 0 ].addEventListener( sub[ 1 ], sub[ 2 ] ) );
   };
   unsubscribe() {
      this.subscriptions.forEach( sub => sub[ 0 ].removeEventListener( sub[ 1 ], sub[ 2 ] ) );
      this.subscriptions.length = 0;
   }
}


export class VirtualScrollApi {
   mode: ListGridMode = 'ssr';
   rerender?: () => void;
   debounceRender = debounce( () => this.rerender?.(), 100 ).bind( this );
   listApi = new ListApi( this );
   columnApi = new ColumnApi( this );
   styleApi = new StyleApi( this );
   publishers = {
      moveColumn: new Publisher<any[]>( [] ),
      resizeColumn: new Publisher<any[]>( [] ),
      hideColumn: new Publisher<any[]>( [] ),
      sortColumn: new Publisher<any[]>( [] ),
      rowData: new Publisher<TSuccessParams>( { rowData: [], lastRow: -1 } ),
      query: new Publisher( 0 )
   };
   constructor () { }
}

class ColumnApi {
   root: VirtualScrollApi;
   colDefs = new ColumnDefinitions();
   columnMenuApi = new ColumnMenuApi( this );
   moveColumnApi = new MoveColumnApi( this );
   resizeColumnApi = new ResizeColumnApi( this );
   constructor ( root: VirtualScrollApi ) {
      this.root = root;
   }

   toggleColumn( field: string ) {
      const value = this.colDefs.custom[ field ].hidden;

      this.colDefs.custom = {
         ...this.colDefs.custom,
         [ field ]: {
            ...this.colDefs.custom[ field ],
            hidden: value ? false : true
         }
      };

      this.root.publishers.hideColumn.publish();
      this.root.rerender?.();
   }
}

class ColumnDefinitions {
   default: IDefaultColDefs;
   base: any[];
   #custom: IColDefs;
   get custom() { return this.#custom; }
   set custom( v: IColDefs ) {
      this.#custom = v;

      this.merged = this.base.map( ( def ) => {
         return {
            ...this.default,
            ...def,
            ...this.custom[ def.field ]
         };
      } ).sort( ( a, b ) => a.order - b.order );
   }
   merged: IColDefs[] = [];

   createCustomColDefs() {
      return this.base.reduce( ( acc: any, def: any, index: any ) => {
         const width = def.width || def.minWidth || this.default.minWidth || 100;
         const order = index;
         acc[ def.field ] = { ...this.default, ...def, width, order };
         return acc;
      }, {} );
   }
}

class ColumnMenuApi extends EventApi {
   columnApi: ColumnApi;
   open = false;
   xy = [ 150, 150 ];

   constructor ( columnApi: ColumnApi ) {
      super();
      this.columnApi = columnApi;
   }

   openMenu( e: MouseEvent ) {
      this.open = true;
      this.xy = [ e.clientX - 15, e.clientY - 15 ];
      this.subscriptions.push( [ window, 'mousedown', this.closeMenu.bind( this ) ] );
      this.columnApi.root.rerender?.();
      super.subscribe();
   }
   closeMenu( e: MouseEvent ) {
      const insideMenu = e.composedPath()
         .some( ( path: any ) => path.id == 'fieldHeader-menu' );

      if ( insideMenu ) return;

      this.open = false;
      this.xy = [ 0, 0 ];
      this.columnApi.root.rerender?.();
      super.unsubscribe();
   }
}

class MoveColumnApi extends EventApi {
   columnApi: ColumnApi;
   field = '';
   label = '';
   elementId = '';
   moving = false;
   startPos = [ 100, 100 ];
   offset = [ 0, 0 ];
   frameQueue = false;

   constructor ( columnApi: ColumnApi ) {
      super();
      this.columnApi = columnApi;
   }

   mousedown( e: MouseEvent, field: string, id: string ) {
      e.preventDefault();

      const el = document.getElementById( id );
      if ( e.buttons !== 1 || !el ) return;

      this.startPos = [ e.clientX, e.clientY ];
      this.field = field;
      this.label = this.columnApi.colDefs.merged.find( d => d.field == field )?.label || '';
      this.elementId = 'listgrid-drag-' + field;

      this.subscribe();
   }
   mousemove( e: MouseEvent ) {
      e.preventDefault();

      if ( e.buttons !== 1 ) {
         this.unsubscribe();
         return;
      }

      if ( !this.moving ) {
         const travelDistance = [
            Math.abs( e.clientX - this.startPos[ 0 ] ),
            Math.abs( e.clientY - this.startPos[ 1 ] )
         ];

         const sufficientDistance = travelDistance.some( d => d > 15 );
         if ( !sufficientDistance ) return;

         this.moving = true;

         createCSSSelector( '.cursorMove *', 'cursor:move !important;' );
         document.body.classList.add( 'cursorMove' );
      }

      requestAnimationFrame( ( () => {
         if ( this.frameQueue ) return;
         this.frameQueue = true;

         const offset = [ e.clientX - this.startPos[ 0 ], e.clientY - this.startPos[ 1 ] ];
         this.offset = offset;

         this.columnApi.root.rerender?.();

         this.frameQueue = false;
      } ) );
   }
   mouseenter( e: MouseEvent, field: string ) {
      if ( e.buttons !== 1 ) {
         this.unsubscribe();
         return;
      }

      const { columnApi } = this.columnApi.root;

      let moveable = columnApi.colDefs.custom[ field ].moveable;
      moveable = moveable === undefined ? true : moveable;

      if ( !this.moving || !moveable || this.field == field ) return;

      const order1 = columnApi.colDefs.custom[ this.field ].order;
      const order2 = columnApi.colDefs.custom[ field ].order;

      columnApi.colDefs.custom = {
         ...columnApi.colDefs.custom,
         [ this.field ]: {
            ...columnApi.colDefs.custom[ this.field ],
            order: order2
         },
         [ field ]: {
            ...columnApi.colDefs.custom[ field ],
            order: order1
         }
      };

      this.columnApi.root.rerender?.();
   }
   mouseup() {
      this.unsubscribe();
   }
   subscribe() {
      this.subscriptions.push(
         [ window, 'mousemove', this.mousemove.bind( this ) ],
         [ window, 'mouseup', this.mouseup.bind( this ) ]
      );
      super.subscribe();
   }
   unsubscribe() {
      const { publishers } = this.columnApi.root;
      if ( this.moving ) publishers.moveColumn.publish();

      this.field = '';
      this.elementId = '';
      this.moving = false;

      document.body.classList.remove( 'cursorMove' );

      super.unsubscribe();
      this.columnApi.root.rerender?.();
   }
}

class ResizeColumnApi extends EventApi {
   columnApi: ColumnApi;
   field: string | null = null;
   resizing = false;
   element = null as HTMLElement | null;
   frameQueue = false;

   constructor ( columnApi: ColumnApi ) {
      super();
      this.columnApi = columnApi;
   }

   getRects() { return this.element?.getBoundingClientRect(); }
   mousedown( e: MouseEvent, field: string ) {
      const target = e.target as HTMLElement;
      this.element = target.parentElement?.parentElement as HTMLElement;
      this.field = field;
      this.subscribe();
   }
   mousemove( e: MouseEvent ) {
      e.preventDefault();

      requestAnimationFrame( () => {
         if ( this.frameQueue ) return;
         this.frameQueue = true;

         if ( e.buttons !== 1 || this.field === null ) {
            this.unsubscribe();
            return;
         }

         const rects = this.getRects();
         if ( !rects ) return;

         this.resizing = true;

         const { columnApi } = this.columnApi.root;
         const width = e.x - rects.left;

         columnApi.colDefs.custom = {
            ...columnApi.colDefs.custom,
            [ this.field ]: {
               ...columnApi.colDefs.custom[ this.field ],
               width
            }
         };

         this.columnApi.root.rerender?.();
         this.frameQueue = false;
      } );
   }
   mouseup() {
      this.unsubscribe();
   }
   subscribe() {
      this.subscriptions.push(
         [ window, 'mousemove', this.mousemove.bind( this ) ],
         [ window, 'mouseup', this.mouseup.bind( this ) ]
      );
      super.subscribe();
   }
   unsubscribe() {
      const { publishers } = this.columnApi.root;
      if ( this.resizing ) publishers.resizeColumn.publish();

      super.unsubscribe();
      this.field = null;
      this.resizing = false;
      this.frameQueue = false;
      this.columnApi.root.rerender?.();
   }
}

class ListApi {
   root: VirtualScrollApi;
   scrollApi = new ScrollApi( this );
   listWrapperApi = new ListWrapperApi( this );
   childHeight: number = 45;
   get startNode() {
      const min = 0;
      const max = Math.floor( this.scrollApi.scrollTop / this.childHeight )
         - this.availableHeight;
      return Math.max( min, max );
   };
   get visibleNodeCount() {
      let min = this.rowData.length - this.startNode; min = min > 0 ? min : 0;
      const max = Math.floor( this.availableHeight * 2 );
      return Math.min( min, max );
   }
   get totalHeight() {
      return this.rowCount * this.childHeight || 0;
   };
   get availableHeight() {
      return Math.ceil( this.wrapperHeight / this.childHeight ) || 0;
   }
   get offsetY() {
      const baseOffset = this.startNode * this.childHeight;

      let extra = this.scrollApi.scrollTop > this.wrapperHeight
         ? Math.ceil( this.wrapperHeight / 2 )
         : 0;

      return baseOffset + extra || 0;
   }
   get startColumn() {
      return 0;
   }
   get visibleColumnCount() {
      return 0;
   }
   get totalWidth() {
      return 0;
   }
   get availableWidth() {
      return 0;
   }
   get offsetX() {
      return 0;
   }
   get viewSaturated() {
      return ( this.rowCount > this.availableHeight ) || this.lastRow > -1;
   }
   get sortModel() {
      return Object
         .entries( this.root.columnApi.colDefs.custom )
         .filter( ( o: any ) => o[ 1 ].sort )
         .map( ( def: any ) => ( { sort: def[ 1 ].sort, colId: def[ 1 ].field } ) );
   }
   get rowCount() {
      return this.rowData.length;
   }
   wrapperWidth = 0;
   #wrapperHeight = 0;
   get wrapperHeight() { return this.#wrapperHeight; }
   set wrapperHeight( v: number ) {
      this.#wrapperHeight = v;

      if ( this.viewSaturated ) return;
      this.getRows( { startRow: 0 } );
   }
   datasource: IDatasource;
   querying = false;
   ssrOptions: ISSROptions = {
      batchSize: 100
   };
   rowData: any[] = [];
   lastRow: number = -1;
   checkedRows: any = {};
   allRowsChecked = false;
   cachedRequest: TRequest;

   constructor ( root: VirtualScrollApi ) { this.root = root; }

   setDatasource( datasource: IDatasource ) {
      this.datasource = datasource;
   }
   setColumnDefinitions( defaultColDefs: IDefaultColDefs, colDefs: IColDefs[] ) {
      const { columnApi } = this.root;
      columnApi.colDefs.default = defaultColDefs;
      columnApi.colDefs.base = colDefs;
      columnApi.colDefs.custom = columnApi.colDefs.createCustomColDefs();
   }
   checkAllRows( e: any ) {
      const v = e.target.checked;
      this.allRowsChecked = v;

      if ( !v ) this.checkedRows = {};
      else {
         this.checkedRows = this.rowData.reduce( ( a, c, i ) => {
            a[ i ] = true;
            return a;
         }, {} );
      }

      this.root.rerender?.();
   }
   checkRow( rowIndex: number ) {
      let value = this.checkedRows[ rowIndex ];
      value = value === undefined ? true : !value;

      this.checkedRows[ rowIndex ] = value;
      this.checkedRows = { ...this.checkedRows };

      if ( !value && this.allRowsChecked )
         this.allRowsChecked = false;

      if ( Object.values( this.checkedRows )
         .filter( Boolean ).length == this.rowCount )
         this.allRowsChecked = true;

      this.root.rerender?.();
   }
   sortRows( field: string ) {
      const { moveColumnApi, resizeColumnApi } = this.root.columnApi;
      if ( moveColumnApi.moving || resizeColumnApi.resizing ) return;

      const sort = this.root.columnApi.colDefs.custom[ field ].sort;
      const newSort = !sort ? 'asc' : sort == 'asc' ? 'desc' : null;

      this.root.columnApi.colDefs.custom = {
         ...this.root.columnApi.colDefs.custom,
         [ field ]: {
            ...this.root.columnApi.colDefs.custom[ field ],
            sort: newSort
         }
      };

      this.rowData = [];

      this.getRows( {
         startRow: 0,
         sortModel: this.sortModel
      } );

      this.root.publishers.sortColumn.publish();
   }
   getRows( request: TRequest ) {
      if ( !this.datasource ) return;

      const baseRequestRows = {
         startRow: request.startRow || 0,
         endRow: ( request.startRow || 0 ) + this.ssrOptions.batchSize,
      };

      const baseRequestMisc = {
         sortModel: [],
         filterModel: {},
         /* not sure if this functionality will be implemented
         groupKeys: [],
         pivotCols: [],
         pivotMode: false,
         rowGroupCols: [],
         valueCols: [] */
      };

      request = {
         ...baseRequestMisc,
         ...this.cachedRequest,
         ...baseRequestRows,
         ...request
      };

      if ( this.querying || this.lastRow > -1 ) return;

      ( async () => {
         this.datasource.getRows( {
            request,
            success: this.getRowsSuccess.bind( this ),
            fail: this.getRowsFail.bind( this )
         } );
      } )();

      this.querying = true;
      this.cachedRequest = { ...this.cachedRequest, ...request };
   }
   getRowsSuccess( { rowData, lastRow }: TSuccessParams ) {
      this.lastRow = lastRow;
      this.querying = false;

      this.rowData = [ ...this.rowData, ...rowData ];

      if ( this.allRowsChecked ) {
         this.checkedRows = this.rowData.reduce( ( a, c, i ) => {
            a[ i ] = true;
            return a;
         }, {} );
      }

      this.root.publishers.rowData.next( { rowData, lastRow } );
      this.root.publishers.query.next( this.rowCount );

      this.root.rerender?.();

      // repeat the request untill view is saturated
      // or last row has been fetched
      if ( lastRow > 0 || this.viewSaturated ) return;
      this.getRows( { startRow: this.rowCount } );
   }
   getRowsFail() {
      throw 'VirtualScrollApi FAILED, method not implemented';
   }
}

class ListWrapperApi extends EventApi {
   listApi: ListApi;
   element: HTMLDivElement | null;
   frameQueue = false;
   resizing = false;
   debounceResize = debounce( this.resizeEnd.bind( this ) );

   constructor ( listApi: ListApi ) {
      super();
      this.listApi = listApi;
   }

   resizeEnd() {
      this.resizing = false;
      this.listApi.root.rerender?.();
   }
   calcWrapperHeight = () => {
      const el = this.element;
      if ( !el ) return;

      requestAnimationFrame( () => {
         if ( this.frameQueue ) return;
         this.frameQueue = true;

         if ( !this.resizing ) {
            this.resizing = true;
            this.listApi.root.rerender?.();
         }

         this.debounceResize();

         const rects = el.getBoundingClientRect();
         this.listApi.wrapperWidth = rects.width;
         this.listApi.wrapperHeight = rects.height;

         this.frameQueue = false;
      } );
   };
   subscribe() {
      this.subscriptions.push( [ window, 'resize', this.calcWrapperHeight.bind( this ) ] );
      super.subscribe();
   }
}

class ScrollApi extends EventApi {
   listApi: ListApi;
   scrollTop = 0;
   scrollLeft = 0;
   scrollYDirection = 0;
   element: FlexibleHTMLElement | null;
   frameQueue = false;
   get bottomTrigger() {
      if ( this.listApi.root.mode == 'normal' ) return false;

      const el = this.element;
      if ( !el ) return false;

      const trigger = Math.ceil(
         el.offsetHeight + this.scrollTop + ( this.listApi.childHeight * 2 )
      );

      return trigger > el.scrollHeight && this.scrollYDirection > 0;
   }

   constructor ( listApi: ListApi ) {
      super();
      this.listApi = listApi;
   }

   onScroll( e: Event ) {
      requestAnimationFrame( () => {
         if ( this.frameQueue ) return;
         this.frameQueue = true;

         const ev = e as Event & { target: HTMLElement; };
         const el = this.element;
         if ( !el ) return;

         const { listApi } = this;

         this.scrollYDirection = Math.sign( ev?.target?.scrollTop - el.lastScrollTop );
         this.scrollTop = ev?.target?.scrollTop;
         this.scrollLeft = ev?.target?.scrollLeft;

         /* rerender if scrolling in the X axis */
         if ( el.lastScrollLeft != el.scrollLeft ) {
            this.listApi.root.rerender?.();

            el.lastScrollLeft = el.scrollLeft;
            el.lastScrollTop = el.scrollTop;
            this.frameQueue = false;
            return;
         }

         /* request more data as it hits the bottom of the scroll area */
         if ( this.bottomTrigger ) {
            listApi.getRows( { startRow: listApi.rowData.length } );
            el.lastScrollLeft = el.scrollLeft;
            el.lastScrollTop = el.scrollTop;
            this.frameQueue = false;
            return;
         }

         /* trigger rerender when reaching end of visible rows */
         const moverEl = el.querySelector( '[data-name="viewmover"]' );
         const wrapperRects = el.getBoundingClientRect();
         const moverRects = moverEl?.getBoundingClientRect();

         if ( wrapperRects.top < Number( moverRects?.top ) && this.scrollTop > 0 ) {
            this.listApi.root.debounceRender();
         }

         if ( wrapperRects.bottom > Number( moverRects?.bottom ) ) {
            this.listApi.root.debounceRender();
         }

         // const viewableHeight =
         // this.listApi.visibleNodeCount * this.listApi.childHeight;

         el.lastScrollLeft = el.scrollLeft;
         el.lastScrollTop = el.scrollTop;
         this.frameQueue = false;
      } );
   };
   subscribe() {
      const el = this.element;
      if ( !el ) return;

      el.lastScrollTop = el.scrollTop;
      this.scrollTop = el.scrollTop;
      this.scrollLeft = el.scrollLeft;

      this.subscriptions.push( [ el, 'scroll', this.onScroll.bind( this ) ] );
      super.subscribe();
   }
}

class StyleApi {
   root: VirtualScrollApi;
   get viewportWrapperStyle() {
      const { listApi } = this.root;
      if ( listApi.listWrapperApi.resizing )
         return { height: 'auto' };

      return {
         willChange: 'height',
         height: listApi.wrapperHeight,
         contentVisibility: 'auto',
         containIntrinsicSize: listApi.wrapperHeight
      };
   }
   get viewportStyle() {
      const { listApi } = this.root;

      return {
         willChange: 'height',
         height: listApi.totalHeight
      };
   }
   get viewMoverStyle() {
      const { listApi } = this.root;
      return {
         willChange: 'transform',
         transform: `translateY(${ listApi.offsetY }px)`
      };
   }
   get listHeaderStyle() {
      const { scrollApi } = this.root.listApi;
      return {
         willChange: 'transform',
         transform: `translateX(${ -scrollApi.scrollLeft }px)`
      };
   }
   get headerMenuStyle() {
      const { columnMenuApi } = this.root.columnApi;
      return {
         left: columnMenuApi.xy[ 0 ],
         top: columnMenuApi.xy[ 1 ],
      };
   }
   get columnGhostStyle() {
      const { moveColumnApi } = this.root.columnApi;
      return {
         top: moveColumnApi.startPos[ 1 ] - 5,
         left: moveColumnApi.startPos[ 0 ] - 15,
         willChange: 'translate',
         transform: `translateX(${ moveColumnApi.offset[ 0 ] }px)` +
            ` translateY(${ moveColumnApi.offset[ 1 ] }px)` +
            ` translateZ(0)`
      };
   }

   constructor ( root: VirtualScrollApi ) {
      this.root = root;
   }
}