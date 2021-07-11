import { useModalPortal } from "hooks/useModalPortal";
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import ReactDOM from "react-dom";
import { uuid } from "shared";
import styles from './styles.module.css';


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
         setModals( [ ...modals, modal ] );
      },
   } ) );

   return loaded
      ? (
         ReactDOM.createPortal(
            modals.length
               ? <div className={ styles.modalContainer }>
                  {
                     modals.map( ( M: any, i: number ) => (
                        <M key={ i } className={ styles.modalComponent }></M>
                     ) )
                  }
               </div>
               : <></>,
            document.getElementById( portalId ) as Element
         )
      ) : <></>;
};


export const ForwardModalPortal = forwardRef( ModalPortal );