import { createCSSSelector } from "shared/helpers/createCSSSelector";
import { Publisher } from "shared/helpers/publisher";
import styles from './styles.module.css';


interface FlexibleHTMLElement extends HTMLElement { [ key: string ]: any; };
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
   options: TDatasourceOptions;
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

export class VirtualScrollApi {
   rerender?: () => void;
   listApi = new ListApi( this );
   columnApi = new ColumnApi( this );
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
   moveColumnApi = new MoveColumnApi( this );
   resizeColumnApi = new ResizeColumnApi( this );
   constructor ( root: VirtualScrollApi ) {
      this.root = root;
   }

   toggleColumn( field: string ) {
      const { listApi } = this.root;
      const value = listApi.colDefs.custom[ field ].hidden;

      listApi.colDefs.custom = {
         ...listApi.colDefs.custom,
         [ field ]: {
            ...listApi.colDefs.custom[ field ],
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

class ColumnMenuApi {

}

class MoveColumnApi {
   columnApi: ColumnApi;
   field = '';
   elementId = '';
   moving = false;
   startPos = [ 0, 0 ];
   subscriptions: Array<[ keyof WindowEventMap, any ]> = [];

   constructor ( columnApi: ColumnApi ) {
      this.columnApi = columnApi;
   }

   mousedown( e: MouseEvent, field: string, id: string ) {
      e.preventDefault();

      const el = document.getElementById( id );
      if ( e.buttons !== 1 || !el ) return;

      this.startPos = [ e.clientX, e.clientY ];
      this.field = field;
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

         createCSSSelector( '.cursorMove *', 'cursor:move !important;' );
         document.body.classList.add( 'cursorMove' );

         this.moving = true;

         const div: HTMLDivElement = document.createElement( 'div' );
         div.id = this.elementId;
         div.setAttribute( 'style',
            `left: ${ this.startPos[ 0 ] - ( 15 ) }px;` +
            `top: ${ this.startPos[ 1 ] - ( 10 ) }px;`
         );

         div.classList.add( styles.headerFieldDrag );

         document.getElementsByTagName( 'body' )[ 0 ].appendChild( div );
      }

      requestAnimationFrame( ( () => {
         const el = document.getElementById( this.elementId );
         if ( !el ) return;

         const offset = [ e.clientX - this.startPos[ 0 ], e.clientY - this.startPos[ 1 ] ];
         el.style.willChange = 'transform';
         el.style.transform = `translate(${ offset[ 0 ] }px, ${ offset[ 1 ] }px)`;
      } ) );
   }
   mouseenter( e: MouseEvent, field: string ) {
      if ( e.buttons !== 1 ) return;
      const { listApi } = this.columnApi.root;

      let moveable = listApi.colDefs.custom[ field ].moveable;
      moveable = moveable === undefined ? true : moveable;

      if ( !this.moving || !moveable || this.field == field ) return;

      const order1 = listApi.colDefs.custom[ this.field ].order;
      const order2 = listApi.colDefs.custom[ field ].order;


      listApi.colDefs.custom = {
         ...listApi.colDefs.custom,
         [ this.field ]: {
            ...listApi.colDefs.custom[ this.field ],
            order: order2
         },
         [ field ]: {
            ...listApi.colDefs.custom[ field ],
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
         [ 'mousemove', this.mousemove.bind( this ) ],
         [ 'mouseup', this.mouseup.bind( this ) ]
      );
      this.subscriptions.forEach( ( sub ) => addEventListener( sub[ 0 ], sub[ 1 ] ) );
   }
   unsubscribe() {
      if ( this.moving ) this.columnApi.root.publishers.moveColumn.publish();

      this.field = '';
      this.moving = false;
      document.body.classList.remove( 'cursorMove' );
      document.getElementById( this.elementId )?.remove();
      this.subscriptions.forEach( ( sub ) => removeEventListener( sub[ 0 ], sub[ 1 ] ) );
      this.subscriptions.length = 0;
   }
}

class ResizeColumnApi {
   columnApi: ColumnApi;
   field = '';
   resizing = false;
   element = null as HTMLElement | null;
   subscriptions: Array<[ keyof WindowEventMap, any ]> = [];

   constructor ( columnApi: ColumnApi ) {
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

      if ( e.buttons !== 1 ) {
         this.unsubscribe();
         return;
      }

      this.resizing = true;

      requestAnimationFrame( () => {
         const rects = this.getRects();
         if ( !rects ) return;

         const { listApi } = this.columnApi.root;

         const width = e.x - rects.left;

         listApi.colDefs.custom = {
            ...listApi.colDefs.custom,
            [ this.field ]: {
               ...listApi.colDefs.custom[ this.field ],
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
         [ 'mousemove', this.mousemove.bind( this ) ],
         [ 'mouseup', this.mouseup.bind( this ) ]
      );
      this.subscriptions.forEach( ( sub ) => addEventListener( sub[ 0 ], sub[ 1 ] ) );
   }
   unsubscribe() {
      if ( this.resizing ) this.columnApi.root.publishers.resizeColumn.publish();

      this.subscriptions.forEach( ( sub ) => removeEventListener( sub[ 0 ], sub[ 1 ] ) );
      this.subscriptions.length = 0;
      this.resizing = false;
   }
}

class ListApi {
   root: VirtualScrollApi;
   scrollApi = new ScrollApi( this );

   get startNode() {
      const min = 0;
      const max = Math.floor( this.scrollApi.scrollTop / this.childHeight ) - this.renderAhead;
      return Math.max( min, max );
   };
   get visibleNodeCount() {
      let min = this.rowData.length - this.startNode; min = min > 0 ? min : 0;
      const max = Math.ceil( this.wrapperHeight / this.childHeight ) + this.renderAhead;
      return Math.min( min, max );
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
         .entries( this.colDefs.custom )
         .filter( ( o: any ) => o[ 1 ].sort )
         .map( ( def: any ) => ( { sort: def[ 1 ].sort, colId: def[ 1 ].field } ) );
   }
   get rowCount() {
      return this.rowData.length;
   }

   childHeight: number = 30;
   renderAhead = 5;

   #wrapperHeight = 0;
   get wrapperHeight() { return this.#wrapperHeight; }
   set wrapperHeight( v: number ) {
      this.#wrapperHeight = v;

      if ( this.viewSaturated ) return;
      this.getRows( { startRow: 0 } );
   }

   datasource: IDatasource;
   querying = false;

   lastRow: number = -1;
   cachedRequest: TRequest;
   ssrOptions: ISSROptions = {
      batchSize: 10
   };

   colDefs = new ColumnDefinitions();

   rowData: any[] = [];

   constructor ( root: VirtualScrollApi ) { this.root = root; }


   setDatasource( datasource: IDatasource ) {
      this.datasource = datasource;
   }
   setColumnDefinitions( defaultColDefs: IDefaultColDefs, colDefs: IColDefs[] ) {
      this.colDefs.default = defaultColDefs;
      this.colDefs.base = colDefs;
      this.colDefs.custom = this.colDefs.createCustomColDefs();
   }

   sortRows( field: string ) {
      const { moveColumnApi, resizeColumnApi } = this.root.columnApi;
      if ( moveColumnApi.moving || resizeColumnApi.resizing ) return;

      const sort = this.colDefs.custom[ field ].sort;
      const newSort = !sort ? 'asc' : sort == 'asc' ? 'desc' : null;

      this.colDefs.custom = {
         ...this.colDefs.custom,
         [ field ]: {
            ...this.colDefs.custom[ field ],
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

class ListWrapperApi {

}

class ScrollApi {
   listApi: ListApi;
   scrollTop = 0;
   scrollLeft = 0;
   scrollDirection = 0;
   get bottomTrigger() {
      const el = this.element;
      if ( !el ) return false;

      const trigger = Math.ceil(
         el.offsetHeight + this.scrollTop + ( el.offsetHeight / 4 )
      );

      return trigger > el.scrollHeight && this.scrollDirection > 0;
   }
   element: FlexibleHTMLElement | null;
   subscriptions: Array<[ HTMLElement, keyof WindowEventMap, any ]> = [];

   constructor ( listApi: ListApi ) {
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
      this.subscriptions.forEach( ( sub ) => sub[ 0 ].addEventListener( sub[ 1 ], sub[ 2 ] ) );
   }
   unsubscribe() {
      this.subscriptions.forEach( ( sub ) => sub[ 0 ].removeEventListener( sub[ 1 ], sub[ 2 ] ) );
      this.subscriptions.length = 0;
   }
}


