import { env } from "env/env";
import { IComposedView } from "hooks/types";
import { useMemo, useState } from "react";
import { asyncRes } from "shared/helpers";


export async function getViewData( table: string, name: string ) {
   if ( !table || !name )
      throw new Error( "missing table or view name" );

   const url: RequestInfo = `${ env.epochHost }/postgres/view/get/${ table }/${ name }`;
   const request: RequestInit = {
      method: "get",
      headers: { "Content-Type": "application/json; charset=utf-8" }
   };

   const [ res, err ] = await asyncRes( fetch( url, request ) );
   if ( err ) return null;

   return await res.json();
}

export const useView = ( table: string, name: string ) => {
   const [ view, setView ] = useState( {} );
   const [ loading, setLoading ] = useState( false );

   useMemo( () => {
      if ( !name || !table ) return;
      setLoading( true );

      getViewData( table, name )
         .then( d => { setView( d ); setLoading( false ); } );
   }, [ name, table ] );

   const forceReload = async () => {
      setLoading( true );
      const data = await getViewData( table, name );
      setView( data );
      setLoading( false );
   };

   return { view, loading, forceReload } as
      { view: IComposedView, loading: boolean; forceReload: () => Promise<any>; };
};

