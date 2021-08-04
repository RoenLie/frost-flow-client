import React, {
   HTMLAttributes, useEffect,
   useMemo, useRef, useState
} from 'react';
import { useClasses } from "hooks";
import styles from './styles.module.css';
import { html } from "lit";
import { FrostListGrid, VirtualScrollApi } from "../web-components/FrostListGrid.wc.js"; FrostListGrid;
import { FrostPreviewOrOpen } from "../web-components/FrostPreviewOrOpen.wc"; FrostPreviewOrOpen;



interface IListGridProps extends HTMLAttributes<HTMLDivElement> { datasource: any; };
export const ListGrid = ( { className, datasource }: IListGridProps ) => {
   const hostClasses = useClasses( styles.host, className );
   const [ $api ] = useState( new VirtualScrollApi() );
   const gridRef = useRef<any>( null );

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
            renderer.addEventListener( 'onPreview', ( e: any ) => console.log( 'on preview event', e ) );
            renderer.addEventListener( 'onOpen', ( e: any ) => console.log( 'on open event', e ) );
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
      },
      {
         label: '1',
         field: '1',
      },
      {
         label: '2',
         field: '2',
      },
      {
         label: '3',
         field: '3',
      },
      {
         label: '4',
         field: '4',
      },
      {
         label: '5',
         field: '5',
      },
      {
         label: '6',
         field: '6',
      },
      {
         label: '7',
         field: '7',
      },
      {
         label: '8',
         field: '8',
      },
      {
         label: '9',
         field: '9',
      },
      {
         label: '10',
         field: '10',
      },
      {
         label: '11',
         field: '11',
      },
      {
         label: '12',
         field: '12',
      },
      {
         label: '13',
         field: '13',
      },
      {
         label: '14',
         field: '14',
      },
      {
         label: '15',
         field: '15',
      },
      {
         label: '16',
         field: '16',
      }
   ];

   useMemo( () => {
      const { listApi } = $api;
      // $api.mode = 'normal';
      listApi.setColumnDefinitions( defaultColDefs, colDefs );
      listApi.setDatasource( datasource );
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
         <div>Hei</div>
      </div>
   );
};