import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { createPortal } from "react-dom";
import { useModalPortal } from "hooks/useModalPortal";
import { uuid } from "shared";
import styles from './styles.module.css';
import { ModalWrapper } from "features/modal/modal-wrapper";


export const ModalRefContext = React.createContext( {} as React.MutableRefObject<IModalPortal | undefined> );
export interface IModalPortal { addModal: ( modal: any ) => void; }


const ModalPortal = ( { ...props }: any, ref: any ) => {
   const { loaded, portalId } = useModalPortal();
   const [ modals, setModals ]: [ any[], Function ] = useState( [] );

   const removeModal = ( id: string ) => {
      setModals( modals.filter( ( m: any ) => m.id !== id ) );
   };

   useImperativeHandle( ref, () => ( {
      addModal( modal: any, options = {} as any ) {
         const { moveable = true, resizeable = true, size = 'large' } = options;
         setModals( [ ...modals, { component: modal, id: uuid(), moveable, resizeable, size } ] );
      },
   } ) );


   return loaded ? ( createPortal(
      modals.length
         ? (
            <ModalRefContext.Provider value={ ref }>
               <div className={ styles.modalContainer }>
                  { modals.map( ( props ) =>
                     <ModalWrapper key={ props.id } onClose={ () => removeModal( props.id ) } { ...props } /> )
                  }
               </div>
            </ModalRefContext.Provider> )
         : <></>,

      document.getElementById( portalId ) as Element
   )
   ) : <></>;
};


export const ForwardModalPortal = forwardRef( ModalPortal );