import { ListGrid, ListHeader, ListPreview, ListTab, ListTabs, ListTree } from "components";
import React, { HTMLAttributes } from 'react';
import styles from './styles.module.css';


export interface IEpochListProps extends HTMLAttributes<HTMLElement> { };
export const EpochList = ( { }: IEpochListProps ) => {
   return (
      <section className={ styles.host }>
         <ListTree className={ styles.listSelector } />
         <ListTab className={ styles.listTabsHome } label="HOME" />
         <ListTabs className={ styles.listTabs } tabs={ tabs } />
         <ListHeader className={ styles.listHeader } />
         <ListGrid className={ styles.list } />
         <ListPreview className={ styles.recordPreview } />
      </section>
   );
};


async function getRowsAsync( params = { request: {} } ) {
   params.request = {
      endRow: 10000,
      filterModel: {},
      groupKeys: [],
      pivotCols: [],
      pivotMode: false,
      rowGroupCols: [],
      sortModel: [],
      startRow: 0,
      valueCols: []
   };

   const url: RequestInfo = `//localhost:8025/postgres/olympic_winners`;
   const request: RequestInit = {
      method: "post",
      body: JSON.stringify( params.request ),
      headers: { "Content-Type": "application/json; charset=utf-8" }
   };

   try {
      var response: any = await fetch( url, request );
      response = await response.json();
   } catch ( error ) {
      console.error( error );
      // params.fail();
      return;
   }

   console.log( response );

   // params.success( {
   //    rowData: response.rows || [],
   //    rowCount: response.lastRow || 0,
   // } );
};

getRowsAsync();


const tabs = [
   {
      label: 'tab1'
   },
   {
      label: 'tab2'
   },
   {
      label: 'tab3'
   },
   {
      label: 'tab4'
   }
];