import { useState, useEffect } from 'react';
import axios from 'axios';
import { TUseAxios } from "hooks/types";


export const useAxios: TUseAxios = ( {
   baseUrl,
   params = {
      method: 'GET',
      headers: {
         accept: '*/*',
      }
   }
} ) => {
   axios.defaults.baseURL = baseUrl;

   const [ response, setResponse ] = useState( null );
   const [ error, setError ] = useState( null );
   const [ loading, setLoading ] = useState( false );

   const fetchData = async () => {
      setLoading( true );
      try {
         const res = await axios.request( params );
         setResponse( res.data );
         setError( null );
      } catch ( err ) {
         setError( err );
      } finally {
         setLoading( false );
      }
   };

   useEffect( () => {
      console.log( 'fething all views' );

      fetchData();
   }, [] );

   return { response, error, loading } as any;
};