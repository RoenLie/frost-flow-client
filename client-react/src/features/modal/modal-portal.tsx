import React, { useState } from 'react';
import { createPortal } from "react-dom";
import { useModalPortal, ModalPortalService, MemoModalWrapper } from ".";
import styles from './styles.module.css';


export const ModalPortal = ( { serviceProvider }: { serviceProvider: ModalPortalService; } ) => {
   const { loaded, portalId } = useModalPortal();
   const [ modals, setModals ]: [ any[], Function ] = useState( [] );

   serviceProvider.bind( modals, setModals );

   const removeModal = ( id: string ) => setModals( modals.filter( ( m: any ) => m.id !== id ) );


   return loaded ? ( createPortal(
      modals.length
         ? (
            <div className={ styles.modalContainer }>
               { modals.map( ( props ) =>
                  <MemoModalWrapper key={ props.id } onClose={ () => removeModal( props.id ) } { ...props } /> )
               }
            </div> )
         : <></>,

      document.getElementById( portalId ) as Element
   )
   ) : <></>;
};