import ReactDOM from "react-dom";
import React, { useState, forwardRef, useImperativeHandle } from "react";
import { uuid } from 'shared';
import { Toast } from "components";
import { useToastPortal } from 'hooks';
import styles from './styles.module.css';
import { ToastWrapper } from "components/toast-portal/toast-wrapper";


export interface IToastPortal { addMessage: ( toast: any ) => void; }
export const ToastRefContext = React.createContext( {} as React.MutableRefObject<IToastPortal | undefined> );

export class ToastPortalService {
   toasts: any[] = [];
   setToasts: Function = () => { };
   bind( toasts: any[], setToasts: Function ) {
      this.toasts = toasts;
      this.setToasts = setToasts;
   }
   addMessage( toast: any ) {
      this.setToasts( [ ...this.toasts, { id: uuid(), ...toast } ] );
   }
}

const ToastPortal = ( { serviceProvider, ToastTemplate }: { [ key: string ]: any, serviceProvider: ToastPortalService; }, ref: any ) => {
   const [ toasts, setToasts ]: [ any[], Function ] = useState( [] );
   const { loaded, portalId } = useToastPortal();

   serviceProvider.bind( toasts, setToasts );

   const removeToast = ( id: string ) => {
      setToasts( toasts.filter( ( t: any ) => t.id !== id ) );
   };

   useImperativeHandle( ref, () => ( {
      addMessage( toast: any ) {
         setToasts( [ ...toasts, { id: uuid(), ...toast } ] );
      },
   } ) );

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

export const ForwardToastPortal = forwardRef( ToastPortal );