import React, { HTMLAttributes, useEffect, useState } from 'react';
import { MemoVirtualScroll } from "features/virtual-scroll";
import { VirtualScrollApi } from "features/virtual-scroll/VirtualListGridApi";
import { useClasses } from "hooks";
import styles from './styles.module.css';


interface IListGridProps extends HTMLAttributes<HTMLDivElement> { datasource: any; };
export const ListGrid = ( { className, datasource }: IListGridProps ) => {
   const hostClasses = useClasses( styles.host, className );
   const [ $api ] = useState( new VirtualScrollApi() );

   useEffect( () => {
      console.log( $api );
      const { listApi } = $api;

      listApi.setDatasource( datasource );

      const resizeColumnSub = listApi.resizeColumnPublisher.subscribe( () => {
         console.log( 'column resized' );
      } );

      const moveColumnSub = listApi.moveColumnPublisher.subscribe( () => {
         console.log( 'column moved' );
      } );

      const hideColumnSub = listApi.hideColumnPublisher.subscribe( () => {
         console.log( 'column visibility toggled' );
      } );

      const sortColumnSub = listApi.sortColumnPublisher.subscribe( () => {
         console.log( 'row data sorted' );
      } );


      return () => {
         resizeColumnSub.unsubscribe();
         moveColumnSub.unsubscribe();
         hideColumnSub.unsubscribe();
         sortColumnSub.unsubscribe();
      };
   }, [] );

   $api.listApi.childHeight = 30;
   $api.listApi.renderAhead = 5;

   $api.listApi.defaultColDefs = {
      minWidth: 100,
      sortable: true,
      resizable: true,
      menu: true
   };

   $api.listApi.colDefs = [
      {
         label: '',
         field: '',
         minWidth: 50,
         resizable: false,
         moveable: false,
         menu: true
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


   return (
      <div className={ hostClasses }>
         <MemoVirtualScroll api={ $api } />
      </div>
   );
};