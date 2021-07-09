import { useEffect, useState } from 'react';


interface IToastAutoClose {
   toasts: any;
   setToasts: Function;
   autoClose: boolean;
   autoCloseTime: number;
}


export const useToastAutoClose = ( {
   toasts,
   setToasts,
   autoClose,
   autoCloseTime,
}: IToastAutoClose ) => {
   const [ removing, setRemoving ] = useState( '' );

   useEffect( () => {
      if ( removing )
         setToasts( ( t: any ) => t.filter( ( t: any ) => t.id !== removing ) );
   },
      [ removing, setToasts ]
   );

   useEffect( () => {
      if ( autoClose && toasts.length ) {
         const id = toasts[ toasts.length - 1 ].id;
         setTimeout( () => setRemoving( id ), autoCloseTime );
      }
   },
      [ toasts, autoClose, autoCloseTime ]
   );
};