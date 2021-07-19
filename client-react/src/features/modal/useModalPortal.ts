import { uuid } from 'shared';
import { useState, useEffect } from 'react';


export const useModalPortal = () => {
   const [ loaded, setLoaded ] = useState( false );
   const [ portalId ] = useState( `modal-portal-${ uuid() }` );

   useEffect( () => {
      const div: any = document.createElement( 'div' );
      div.id = portalId;
      div.style = 'position: fixed; top: 0px; left: 0px;';
      document.getElementsByTagName( 'body' )[ 0 ].appendChild( div );

      setLoaded( true );

      return () => document.getElementsByTagName( 'body' )[ 0 ].removeChild( div );
   },
      [ portalId ]
   );

   return { loaded, portalId };
};