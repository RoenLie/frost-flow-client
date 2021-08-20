import React, { CSSProperties, useMemo } from 'react';
import styles from './styles.module.css';
import { useQuery } from "hooks/useQuery";
import { useRecord } from "hooks/useRecord";
import { useView } from "hooks/useView";


export const EpochRecord = ( { location } ) => {
   const query = useQuery();

   const table = query.get( 'table' ) || '';
   const id = query.get( 'id' ) || '';
   const viewName = query.get( 'view' ) || 'default';

   const record = useRecord( table, id );
   const {view} = useView( table, viewName );

   const Section = () => {



   };


   const sections = useMemo( () => {
      if ( Object.isEmpty( view ) ) return;

      const maxWidth = view.section.reduce( ( acc: number, sec ) =>
         acc < sec.grid_width ? sec.grid_width : acc, 0 );
      const maxHeight = view.section.reduce( ( acc: number, sec ) =>
         acc < sec.grid_height ? sec.grid_height : acc, 0 );

      console.log( maxWidth, maxHeight );

      const getDimTemplate = ( prop: string ) =>
         view.section.map( s => s[ prop ] + 'fr' ).join( ' ' );

      const sectionWrapperStyle = {
         display: 'grid',
         gridTemplateColumns: getDimTemplate( 'grid_width' ),
         gridTemplateRows: getDimTemplate( 'grid_height' ),
         backgroundColor: 'pink'
      } as CSSProperties;


      const sectionStyle = {
         display: 'grid',
         gridTemplateColumns: getDimTemplate( 'grid_width' ),
         gridTemplateRows: getDimTemplate( 'grid_height' ),
         backgroundColor: 'pink'
      } as CSSProperties;


      return (
         <div style={ sectionWrapperStyle }>
            { view.section.map( ( section ) => {

               return (
                  <div key={ section.sys_id }>
                     { section.name }
                  </div>
               );
            } ) }
         </div>
      );
   }, [ view ] );




   return (
      <div className={ styles.host }>
         <h1>EPOCH RECORD</h1>
         { sections }
         <pre>{ JSON.stringify( location, null, 2 ) }</pre>
         <pre>{ JSON.stringify( view, null, 2 ) }</pre>
         <pre>{ JSON.stringify( record, null, 2 ) }</pre>
      </div>
   );
};