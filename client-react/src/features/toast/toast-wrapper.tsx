import React, { memo, useEffect, useState } from 'react';


export const ToastWrapper = ( { children, autoClose, autoCloseTime, onClose }: any ) => {
   const [ removing, setRemoving ] = useState( 0 );
   let removalTimeout: number | undefined = undefined;

   useEffect(
      () => { if ( removing ) onClose(); },
      [ removing ]
   );

   useEffect(
      () => {
         if ( autoClose )
            removalTimeout = setTimeout( () =>
               setRemoving( removing + 1 ), autoCloseTime );

         return () => clearTimeout( removalTimeout );
      },
      [ autoClose ]
   );

   return (
      <div>
         { children }
      </div>
   );
};

export const MemoToastWrapper = memo( ToastWrapper );