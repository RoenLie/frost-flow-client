import React, {
   HTMLAttributes, useEffect,
   useMemo, useState
} from 'react';
import { MemoVirtualScroll } from "features/virtual-scroll";
import { VirtualScrollApi } from "features/virtual-scroll/VirtualListGridApi";
import { useClasses } from "hooks";
import styles from './styles.module.css';


interface IListGridProps extends HTMLAttributes<HTMLDivElement> { datasource: any; };
export const ListGrid = ( { className, datasource }: IListGridProps ) => {
   const hostClasses = useClasses( styles.host, className );
   const [ $api ] = useState( new VirtualScrollApi() );

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
         actions: [
            { icon: 'eye_regular' },
            { icon: 'box_open_solid' }
         ]
      },
      {
         label: 'AthleteLongLableTestAthleteLongLableTest',
         field: 'athlete',
         minWidth: 150,
         menu: false
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
      console.log( $api );
      const { listApi } = $api;
      listApi.setColumnDefinitions( defaultColDefs, colDefs );
      listApi.setDatasource( datasource );
   }, [] );


   useEffect( () => {
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
         <MemoVirtualScroll api={ $api } />
         {/* <div style={ { height: 100 } }>Hei</div> */ }
      </div>
   );
};