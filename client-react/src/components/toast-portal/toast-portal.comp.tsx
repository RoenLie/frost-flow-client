import ReactDOM from "react-dom";
import React, { useState, forwardRef, useImperativeHandle } from "react";
import { uuid } from 'shared';
import { Toast } from "components";
import { useToastPortal, useToastAutoClose } from 'hooks';
import styles from './styles.module.css';


export interface IToastPortal {
   addMessage: ( toast: any ) => void;
}

/**
 * The parent of this component should not have
 * to worry about maintaining a list of message
 * objects. That would require the parent to
 * also manage the deletion of toasts, etc.
 *
 * To accommodate this, we are using a combination
 * of useImperativeHandle and forwardRef to give
 * the parent access to this component's addMessage
 * functionality.
 */
const ToastPortal = ( { autoClose = false, autoCloseTime = 5000 }: any, ref: any ) => {
   const [ toasts, setToasts ]: [ any[], Function ] = useState( [] );
   const { loaded, portalId } = useToastPortal();

   useToastAutoClose( {
      toasts,
      setToasts,
      autoClose,
      autoCloseTime,
   } );

   const removeToast = ( id: string ) => {
      setToasts( toasts.filter( ( t: any ) => t.id !== id ) );
   };

   useImperativeHandle( ref, () => ( {
      addMessage( toast: any ) {
         setToasts( [ ...toasts, { ...toast, id: uuid() } ] );
      },
   } ) );

   return loaded ? (
      ReactDOM.createPortal(
         <div className={ styles.toastContainer }>
            { toasts.map( t => (
               <Toast
                  key={ t.id }
                  mode={ t.mode }
                  message={ t.message }
                  onClose={ () => removeToast( t.id ) }
               />
            ) ) }
         </div>,

         document.getElementById( portalId ) as Element,
      )
   ) : (
      <></>
   );
};

export const ForwardToastPortal = forwardRef( ToastPortal );