import React, {
   HTMLAttributes, useEffect,
   useMemo, useRef, useState
} from 'react';
import { useClasses } from "hooks";
import styles from './styles.module.css';
import { html } from "lit";
import { rootModalService } from "features/modal";
import { asyncRes } from "shared/helpers";
import { FrostListGrid, ListGridApi } from "components/web-components";
import { FrostPreviewOrOpen } from "components/web-components";
import { BasicRecordForm } from "components/modal-form";
import { useHistory } from "react-router-dom";
FrostListGrid;
FrostPreviewOrOpen;



interface IListGridProps extends HTMLAttributes<HTMLDivElement> { [ key: string ]: any; };
export const ListGrid = ( { className }: IListGridProps ) => {
   const hostClasses = useClasses( styles.host, className );
   const history = useHistory();
   const [ $api ] = useState( new ListGridApi() );
   const gridRef = useRef<any>( null );
   const activeTable = 'olympic_winners';


   const openRecordAsModal = async ( rowData: any ) => {
      async function getRecordData( table: string, id: string ) {
         if ( !table || !id ) return;

         const url: RequestInfo = `//localhost:8025/postgres/get/${ table }/${ id }`;
         const request: RequestInit = {
            method: "get",
            headers: { "Content-Type": "application/json; charset=utf-8" }
         };

         const [ res, err ] = await asyncRes( fetch( url, request ) );
         if ( err ) return null;

         return await res.json();
      }

      const recData = await getRecordData( activeTable, rowData.data.sys_id );

      rootModalService.addModal( { component: BasicRecordForm, passthrough: { record: recData } } as IModalWrapperProps );
   };

   const openRecordAsEmbedded = ( rowData: any ) => {
      history.push( `/epoch/record?table=${ activeTable }&id=${ rowData.data.sys_id }` );
      console.log( 'stuff?' );
   };

   const defaultColDefs = {
      minWidth: 100,
      sortable: true,
      resizable: true,
      menu: true
   };

   const colDefs = [
      {
         label: '',
         field: '',
         minWidth: 80,
         resizable: false,
         moveable: false,
         menu: true,
         checkbox: true,
         // renderer: ( rowData: any ) => {
         //    return `🍔`;
         // }
         // renderer: ( rowData: any ) => {
         //    const newDiv = document.createElement( "div" );
         //    const newContent = document.createTextNode( "🍕" );
         //    newDiv.appendChild( newContent );
         //    return newDiv;
         // }
         renderer: ( rowData: any ) => {
            const renderer = document.createElement( 'frost-preview-or-open' ) as any;
            renderer.rowData = rowData;
            renderer.addEventListener( 'onPreview', ( e: any ) => openRecordAsEmbedded( e.detail ) );
            renderer.addEventListener( 'onOpen', ( e: any ) => openRecordAsModal( e.detail ) );
            return renderer;
         }
         // renderer: ( rowData: any ) => html`
         // <frost-preview-or-open
         //    .rowData=${ rowData }
         //    @onOpen=${ ( e: any ) => console.log( 'on open event', e ) }
         //    @onPreview=${ ( e: any ) => console.log( 'on preview event', e ) }
         // />`
      },
      {
         label: 'AthleteLongLableTestAthleteLongLableTest',
         field: 'athlete',
         minWidth: 150,
         menu: false,
      },
      {
         label: 'Sport',
         field: 'sport',
      },
      {
         label: 'Country',
         field: 'country'
      },
      {
         label: 'Age',
         field: 'age',
      },
      {
         label: 'Year',
         field: 'year',
      },
      {
         label: 'Date',
         field: 'date',
      },
      {
         label: 'Gold',
         field: 'gold',
      },
      {
         label: 'Silver',
         field: 'silver',
      },
      {
         label: 'Bronze',
         field: 'bronze',
      },
      {
         label: 'Total',
         field: 'total',
      }
   ];

   useMemo( () => {
      const { setupApi } = $api;
      setupApi.columnDefinitions( defaultColDefs, colDefs );
      setupApi.datasource( { getRows: getRowsAsync } );
   }, [] );

   useEffect( () => {
      if ( !gridRef.current ) return;
      gridRef.current.initialize( $api );

      const { publishers } = $api;

      const resizeSub = publishers.resizeColumn.subscribe( () => {
         console.log( 'column resized' );
      } );
      const moveSub = publishers.moveColumn.subscribe( () => {
         console.log( 'column moved' );
      } );
      const hideSub = publishers.hideColumn.subscribe( () => {
         console.log( 'column visibility toggled' );
      } );
      const sortSub = publishers.sortColumn.subscribe( () => {
         console.log( 'row data sorted' );
      } );

      return () => {
         resizeSub.unsubscribe();
         moveSub.unsubscribe();
         hideSub.unsubscribe();
         sortSub.unsubscribe();
      };
   }, [] );


   return (
      <div className={ hostClasses }>
         <frost-list-grid ref={ gridRef } ></frost-list-grid>
      </div>
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