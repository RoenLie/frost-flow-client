import { env } from "env/env";
import { useMemo, useState } from "react";
import { asyncRes } from "shared/helpers";

export async function getRecordData( table: string, id: string ) {
   if ( !table || !id ) return;

   const url: RequestInfo = `${ env.epochHost }/postgres/get/${ table }/${ id }`;
   const request: RequestInit = {
      method: "get",
      headers: { "Content-Type": "application/json; charset=utf-8" }
   };

   const [ res, err ] = await asyncRes( fetch( url, request ) );
   if ( err ) return null;

   return await res.json();
}

export const useRecord = ( table: string, id: string ) => {
   const [ record, setRecord ] = useState( {} );
   useMemo( () => {
      ( async () => {
         if ( !id || !table ) return;

         const recData = await getRecordData( table, id );
         setRecord( recData );
      } )();
   }, [] );

   return record as PostgresResult<IOlympicWinners>;
};


export type PostgresResult<T> = { data: T[], columns: any[]; };
export interface IOlympicWinners {
   sys_id: string;
   sys_created_at: string;
   sys_updated_at: string;
   age: number;
   athlete: string;
   country: string;
   country_group: string;
   year: number;
   date: string;
   sport: string;
   gold: number;
   silver: number;
   bronze: number;
   total: number;
}