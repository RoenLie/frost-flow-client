import { Publisher } from "shared/helpers/publisher";


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

export class VirtualScrollApi {
   rerender?: () => void;
   listApi = new ListApi( this );
   headerApi = new HeaderApi( this );
   constructor () {

   }
}

class HeaderApi {
   root: VirtualScrollApi;
   constructor ( root: VirtualScrollApi ) {
      this.root = root;
   }
}


class ListApi {
   root: VirtualScrollApi;
   get totalHeight() {
      return this.rowData.length * this.childHeight || 0;
   };
   get startNode() {
      const min = 0;
      const max = Math.floor( this.scrollTop / this.childHeight ) - this.renderAhead;
      return Math.max( min, max ) || 0;
   };
   get visibleNodeCount() {
      const min = this.rowData.length - this.startNode;
      const max = Math.ceil( this.wrapperHeight / this.childHeight ) + this.renderAhead;
      return Math.min( min, max );
   }
   get offsetY() {
      return this.startNode * this.childHeight || 0;
   }
   get availableHeight() {
      return this.wrapperHeight / this.childHeight || 0;
   }
   get viewSaturated() {
      return ( this.rowCount > this.availableHeight ) || this.lastRow > -1;
   }
   get mergedColDefs() {
      const merged = this.colDefs.map( ( def, i ) => {
         return {
            ...this.defaultColDefs,
            ...def,
            ...this.customColDefs[ def.field ]
         };
      } ).sort( ( a, b ) => a.order - b.order );

      return merged;
   }


   childHeight: number = 30;
   scrollTop = 0;
   renderAhead = 5;
   wrapperHeight = 0;
   datasource: IDatasource;
   querying = false;
   rowCount: number = 0;
   lastRow: number = -1;
   batchSize: number = 2;
   cachedRequest: TRequest;
   ssrOptions: ISSROptions = {
      batchSize: 10
   };
   defaultColDefs: IDefaultColDefs = {
      minWidth: 100,
      sortable: true,
      resizable: true,
      menu: false
   };
   colDefs: any[] = [];
   customColDefs: any = undefined;


   rowData: any[] = [];

   rowDataPublisher = new Publisher<TSuccessParams>( { rowData: [], lastRow: -1 } );
   queryPublisher = new Publisher<number>( 0 );
   moveColumnPublisher = new Publisher<any[]>( [] );
   resizeColumnPublisher = new Publisher<any[]>( [] );
   hideColumnPublisher = new Publisher<any[]>( [] );
   sortColumnPublisher = new Publisher<any[]>( [] );


   constructor ( root: VirtualScrollApi ) {
      this.root = root;
      this.rowDataPublisher.subscribe( ( ( { rowData }, { rowData: previous } ) => {
         this.rowData = [ ...this.rowData, ...rowData ];
      } ) );
   }

   setDatasource( datasource: IDatasource ) {
      this.datasource = datasource;
   }

   sortRows( request: TRequest ) {
      this.rowData = [];
      this.rowCount = 0;

      this.getRows( request );
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
      this.rowCount = this.rowCount + rowData.length;
      this.lastRow = lastRow;
      this.querying = false;

      this.rowDataPublisher.next( { rowData, lastRow } );
      this.queryPublisher.next( this.rowCount );

      this.root.rerender?.();

      // console.log( {
      //    lastRow,
      //    viewSaturated: this.viewSaturated,
      //    rowCount: this.rowCount,
      //    availableHeight: this.availableHeight
      // } );

      // repeat the request untill view is saturated
      // or last row has been fetched
      if ( lastRow > 0 || this.viewSaturated ) return;
      this.getRows( { startRow: this.rowCount } );
   }
   getRowsFail() {
      throw 'VirtualScrollApi FAILED, method not implemented';
   }
}
