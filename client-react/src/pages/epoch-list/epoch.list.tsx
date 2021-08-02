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
   // success( {
   //    rowData: [ {} ],
   //    lastRow: 1,
   // } );
};

// const getRowsAsync = async ( { request, fail, success }: IGetRowsParams ) => {
//    const fakeObj = {
//       age: 21,
//       athlete: 'Kaitlin Sandeno',
//       bronze: 1,
//       country: 'United States',
//       country_group: 'U',
//       date: '2004-08-29T00:00:00.000Z',
//       gold: 1,
//       silver: 1,
//       sport: 'Swimming',
//       sys_created_at: '2021-05-23T23:27:58.226Z',
//       sys_id: '459be9f2-bc2f-11eb-9838-0242c0a85003',
//       sys_updated_at: '2021-05-23T23:27:58.226Z',
//       total: 3,
//       year: 2004
//    };

//    success( {
//       rowData: new Array( 4000 ).fill( fakeObj ),
//       lastRow: 4000 || 0,
//    } );
// };