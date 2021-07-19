import { ModalRefContext } from "features";
import { rootModalPortalService } from "features/layout/default/default.layout";
import React, { useContext, useState } from 'react';
import { uuid } from "shared";

export const Modal = ( { onClose }: any ) => {
   const [ uniqueId, setUniqueId ] = useState( uuid() );

   const style = {
      height: '30rem',
      width: '30rem'
   };

   const modalContext = useContext( ModalRefContext );
   const { current: modalRef } = modalContext;



   return (
      <div style={ style }>
         <h1>MODAL CONTENT</h1>
         <h4>{ uniqueId }</h4>
         <button onClick={ () => rootModalPortalService.addModal( Modal ) }>NEW MODAL FROM CONTEXT</button>
         {/* <button onClick={ () => modalRef?.addModal( Modal ) }>NEW MODAL FROM CONTEXT</button> */ }
      </div>
   );
};