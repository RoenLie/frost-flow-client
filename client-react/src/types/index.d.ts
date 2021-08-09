export { };

declare global {
   namespace JSX {
      interface IntrinsicElements {
         'frost-list-grid': { ref: React.MutableRefObject<any>; };
      }
   }

   type PostgresResult<T> = { data: T[], columns: any[]; };

   interface IGetRowsParams {
      request: TRequest;
      fail: () => void;
      success: ( { rowData, lastRow }: TSuccessParams ) => void;
   }

   type TSuccessParams = {
      rowData: any[],
      lastRow: number;
   };

   type TRequest = {
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
}

