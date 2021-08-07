import { useQuery } from "hooks/useQuery";
import React, { useMemo, useState } from 'react';
import { asyncRes } from "shared/helpers";
// import styles from './styles.module.css';


export const EpochRecord = ( { location } ) => {
   const query = useQuery();
   const [ recData, setRecData ] = useState( {} );

   useMemo( () => {
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

      ( async () => {
         const sysId = query.get( 'id' );
         const table = query.get( 'table' );
         if ( !sysId || !table ) return;

         console.log( 'running query' );

         const recData = await getRecordData( table, sysId );

         setRecData( recData );
      } )();
   }, [] );




   return (
      <div>
         <h1>EPOCH RECORD</h1>
         <pre>{ JSON.stringify( location, null, '\t' ) }</pre>
         <pre>{ JSON.stringify( recData, null, '\t' ) }</pre>
      </div>
   );
};