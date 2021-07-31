import { createCSSSelector } from "shared/helpers/createCSSSelector";
import { Publisher } from "shared/helpers/publisher";
import styles from './styles.module.css';


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
   rerender?: () => void;
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
         const offset = [ e.clientX - this.startPos[ 0 ], e.clientY - this.startPos[ 1 ] ];
         this.offset = offset;

         this.columnApi.root.rerender?.();
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
   }
}

class ListApi {
   root: VirtualScrollApi;
   scrollApi = new ScrollApi( this );
   listWrapperApi = new ListWrapperApi( this );
   childHeight: number = 45;
   renderAhead = 10;

   get startNode() {
      const min = 0;
      const max = Math.floor( this.scrollApi.scrollTop / this.childHeight ) - this.renderAhead;
      return Math.max( min, max );
   };
   get visibleNodeCount() {
      let min = this.rowData.length - this.startNode; min = min > 0 ? min : 0;
      const max = Math.ceil( this.wrapperHeight / this.childHeight ) + this.renderAhead;
      let val = Math.min( min, max ); val = val % 2 == 1 ? val++ : val;
      return val;
   }
   get totalHeight() {
      return this.rowCount * this.childHeight || 0;
   };
   get availableHeight() {
      return this.wrapperHeight / this.childHeight || 0;
   }
   get offsetY() {
      return this.startNode * this.childHeight || 0;
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
      batchSize: 25
   };

   rowData: any[] = [];
   lastRow: number = -1;
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

      this.datasource.getRows( {
         request,
         success: this.getRowsSuccess.bind( this ),
         fail: this.getRowsFail.bind( this )
      } );

      this.querying = true;
      this.cachedRequest = { ...this.cachedRequest, ...request };
   }
   getRowsSuccess( { rowData, lastRow }: TSuccessParams ) {
      this.lastRow = lastRow;
      this.querying = false;

      this.rowData = [ ...this.rowData, ...rowData ];

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

   constructor ( listApi: ListApi ) {
      super();
      this.listApi = listApi;
   }

   calcWrapperHeight = () => {
      const el = this.element;
      if ( !el ) return;

      requestAnimationFrame( () => {
         const rects = el.getBoundingClientRect();
         const wrapperHeight = rects.bottom > window.innerHeight
            ? window.innerHeight - rects.top - 1
            : rects.height;

         this.listApi.wrapperHeight = wrapperHeight;
         this.listApi.root.rerender?.();
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
   scrollDirection = 0;
   element: FlexibleHTMLElement | null;
   get bottomTrigger() {
      const el = this.element;
      if ( !el ) return false;

      const trigger = Math.ceil(
         el.offsetHeight + this.scrollTop + ( el.offsetHeight / 4 )
      );

      return trigger > el.scrollHeight && this.scrollDirection > 0;
   }

   constructor ( listApi: ListApi ) {
      super();
      this.listApi = listApi;
   }

   onScroll( e: Event ) {
      const ev = e as Event & { target: HTMLElement; };
      const el = this.element;
      if ( !el ) return;

      requestAnimationFrame( () => {
         this.scrollDirection = Math.sign( ev?.target?.scrollTop - el.lastScrollTop );
         this.scrollTop = ev?.target?.scrollTop;
         this.scrollLeft = ev?.target?.scrollLeft;
         el.lastScrollTop = ev?.target?.scrollTop;
         el.lastScrollLeft = ev?.target?.scrollLeft;

         const { listApi } = this;
         if ( this.bottomTrigger )
            listApi.getRows( { startRow: listApi.rowData.length } );
         else
            this.listApi.root.rerender?.();
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
      return {
         willChange: 'height',
         height: this.root.listApi.wrapperHeight
      };
   }
   get viewportStyle() {
      return {
         willChange: 'height',
         height: this.root.listApi.totalHeight
      };
   }
   get viewMoverStyle() {
      return {
         willChange: 'transform',
         transform: `translateY(${ this.root.listApi.offsetY }px)`
      };
   }
   get listHeaderStyle() {
      return {
         willChange: 'transform',
         transform: `translateX(${ -this.root.listApi.scrollApi.scrollLeft }px)`
      };
   }
   get headerMenuStyle() {
      return {
         left: this.root.columnApi.columnMenuApi.xy[ 0 ],
         top: this.root.columnApi.columnMenuApi.xy[ 1 ],
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