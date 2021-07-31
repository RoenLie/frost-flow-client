import {
   ListGrid,
   ListHeader,
   ListPreview,
   ListTab,
   ListTabs,
   ListTree,
} from "components";
import { IDatasource, IGetRowsParams, TRequest, TSuccessParams } from "features/virtual-scroll/VirtualListGridApi";
import React, { HTMLAttributes } from 'react';
import { asyncRes } from "shared/helpers/asyncRes";
import styles from './styles.module.css';


export interface IEpochListProps extends HTMLAttributes<HTMLElement> { };
export const EpochList = ( { }: IEpochListProps ) => {
   const datasource: IDatasource = {
      getRows: getRowsAsync
   };

   const tabs = [
      { label: 'tab1' },
      { label: 'tab2' },
      { label: 'tab3' },
      { label: 'tab4' }
   ];

   return (
      <section className={ styles.host }>
         <ListTree className={ styles.listSelector } />
         <ListTab className={ styles.listTabsHome } label="HOME" />
         <ListTabs className={ styles.listTabs } tabs={ tabs } />
         <ListHeader className={ styles.listHeader } />
         <ListGrid className={ styles.list } datasource={ datasource } />
         <ListPreview className={ styles.recordPreview } />
      </section>
   );
};


const getRowsAsync = async ( { request, fail, success }: IGetRowsParams ) => {
   const url: RequestInfo = `//localhost:8025/postgres/olympic_winners`;
   const fetchRequest: RequestInit = {
      method: "post",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify( request )
   };

   const [ res, err ] = await asyncRes( fetch( url, fetchRequest ) );
   if ( err ) { console.error( err ); fail(); return; }

   const response = await res.json();

   success( {
      rowData: response.rows || [],
      lastRow: response.lastRow || 0,
   } );
};
