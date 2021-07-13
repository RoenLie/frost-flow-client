import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { createPortal } from "react-dom";
import { useModalPortal } from "hooks/useModalPortal";
import { uuid } from "shared";
import styles from './styles.module.css';
import { ModalWrapper } from "features/modal/modal-wrapper";


export interface IModalPortal {
   addModal: ( modal: any ) => void;
}


const ModalPortal = ( { ...props }, ref: any ) => {
   const { loaded, portalId } = useModalPortal();
   const [ modals, setModals ]: [ any[], Function ] = useState( [] );

   const removeModal = ( id: string ) => {
      setModals( modals.filter( ( m: any ) => m.id !== id ) );
   };

   useImperativeHandle( ref, () => ( {
      addModal( modal: any ) {
         setModals( [ ...modals, { component: modal, id: uuid() } ] );
      },
   } ) );

   return loaded ? ( createPortal(
      modals.length
         ? <div className={ styles.modalContainer }>
            { modals.map( ( { component: Component, id }, i: number ) => (
               <ModalWrapper key={ i } onClose={ () => removeModal( id ) }
                  component={ Component }>
               </ModalWrapper>
            ) ) }
         </div>
         : <></>,

      document.getElementById( portalId ) as Element
   )
   ) : <></>;
};


export const ForwardModalPortal = forwardRef( ModalPortal );