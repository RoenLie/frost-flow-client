import ReactDOM from "react-dom";
import React, { useState } from "react";
import { Toast } from "./toast";
import { useToastPortal, ToastWrapper, ToastPortalService } from '.';
import styles from './styles.module.css';


interface IToastPortalProps { serviceProvider: ToastPortalService; ToastTemplate?: any; }
export const ToastPortal = ( { serviceProvider, ToastTemplate }: IToastPortalProps ) => {
   const [ toasts, setToasts ]: [ any[], Function ] = useState( [] );
   const { loaded, portalId } = useToastPortal();

   serviceProvider.bind( toasts, setToasts );

   const removeToast = ( id: string ) => {
      setToasts( toasts.filter( ( t: any ) => t.id !== id ) );
   };


   return loaded ? ( ReactDOM.createPortal( toasts.length
      ? <div className={ styles.toastContainer }>
         { toasts.map( t => (
            <ToastWrapper key={ t.id }
               autoClose={ t.autoClose }
               autoCloseTime={ t.autoCloseTime }
               onClose={ () => removeToast( t.id ) }
            >
               { ToastTemplate
                  ? <ToastTemplate mode={ t.mode } message={ t.message } onClose={ () => removeToast( t.id ) } />
                  : <Toast mode={ t.mode } message={ t.message } onClose={ () => removeToast( t.id ) } />
               }
            </ToastWrapper>
         ) ) }
      </div>
      : <></>,
      document.getElementById( portalId ) as Element,
   ) )
      : <></>;
};