import { uuid } from 'shared';
import { useState, useEffect } from 'react';


export const useToastPortal = () => {
   const [ loaded, setLoaded ] = useState( false );
   const [ portalId ] = useState( `toast-portal-${ uuid() }` );

   useEffect( () => {
      const div: any = document.createElement( 'div' );
      div.id = portalId;
      div.style = 'position: fixed; top: 1rem; right: 1rem; z-index: 1;';
      document.getElementsByTagName( 'body' )[ 0 ].appendChild( div );

      setLoaded( true );

      return () => document.getElementsByTagName( 'body' )[ 0 ].removeChild( div );
   },
      [ portalId ]
   );

   return { loaded, portalId };
};