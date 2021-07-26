import { MemoVirtualScroll } from "features/virtual-scroll";
import { useClasses } from "hooks";
import React, { HTMLAttributes, memo, useEffect, useMemo, useRef, useState } from 'react';
import styles from './styles.module.css';



interface IListGridProps extends HTMLAttributes<HTMLDivElement> { datasource: any; };
export const ListGrid = ( { className, datasource }: IListGridProps ) => {
   const hostClasses = useClasses( styles.host, className );
   const [ $rowData, setRowData ]: [ any[], Function ] = useState( [] );
   const [ api ] = useState( new VirtualScrollApi( datasource ) );

   useEffect( () => {
      const sub = api.subscribe( ( { rowData, lastRow }: TSuccessParams ) =>
         setRowData( [ ...$rowData, ...rowData ] ) );

      return () => sub();
   }, [ $rowData ] );

   const listOptions = {
   };

   const defaultColumnDefs = {
      minWidth: 100,
      sortable: true,
      resizable: true,
   };

   const columnDefs = [
      {
         label: 'Athlete',
         field: 'athlete',
         minWidth: 150
      },
      {
         label: 'Sport',
         field: 'sport',
         resizable: false
      },
      {
         label: 'Country',
         field: 'country'
      },
      {
         label: 'Age',
         field: 'age',
         hidden: true
      },
   ];


   return (
      <div className={ hostClasses }>
         <MemoVirtualScroll
            dataTrigger={ api.getRows.bind( api ) }
            itemCount={ $rowData.length }
            childHeight={ 30 }
            defaultColDefs={ defaultColumnDefs }
            colDefs={ columnDefs }
            rowData={ $rowData } />
      </div>
   );
};


export type TSuccessParams = {
   rowData: any[],
   lastRow: number;
};
export type TRequest = {
   endRow: number;
   filterModel: any;
   groupKeys: any[];
   pivotCols: any[];
   pivotMode: boolean;
   rowGroupCols: any[];
   sortModel: any[];
   startRow: number;
   valueCols: any[];
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

export class VirtualScrollApi {
   querying = false;
   datasource: IDatasource;
   rowCount: number = 0;
   lastRow: number = -1;
   subscribers: any[] = [];

   constructor ( datasource: IDatasource ) {
      this.datasource = datasource;
   }

   subscribe( cb: Function ) {
      const newLength = this.subscribers.push( cb );
      return () => this.unsubscribe( newLength - 1 );
   }

   unsubscribe( index: number ) {
      this.subscribers.splice( index, 1 );
   }

   querySubscribers: any[] = [];
   querySubscribe( cb: () => void ) {
      const newLength = this.querySubscribers.push( cb );
      return () => this.queryUnsubscribe( newLength - 1 );
   }
   queryUnsubscribe( index: number ) {
      this.querySubscribers.splice( index, 1 );
   }
   queryingPublisher( rowCount: number ) {
      this.querySubscribers.forEach(
         cb => cb( this.querying, rowCount ) );
   }

   getRows( start: number ) {
      const request = {
         endRow: start + this.datasource.options.batchSize,
         filterModel: {},
         groupKeys: [],
         pivotCols: [],
         pivotMode: false,
         rowGroupCols: [],
         sortModel: [],
         startRow: start,
         valueCols: []
      };

      if ( this.querying || this.lastRow > -1 ) return;

      this.datasource.getRows( {
         request,
         success: this.success.bind( this ),
         fail: this.fail.bind( this )
      } );

      this.querying = true;

      return { subscribe: this.querySubscribe.bind( this ) };
   }

   success( { rowData, lastRow }: TSuccessParams ) {
      this.rowCount = this.rowCount + rowData.length;
      this.lastRow = lastRow;
      this.subscribers.forEach( s => s( { rowData, lastRow } ) );
      this.querying = false;

      this.queryingPublisher( this.rowCount );
   }

   fail() {
      throw 'VirtualScrollApi FAILED, method not implemented';
   }
}