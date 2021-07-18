import React, { useContext } from 'react';
import styles from './styles.module.css';
import { Modal, ModalRefContext } from "features";
import { iocTest1, iocTest2 } from "shared"; $: 'ioc';
import { ToastRefContext } from "components";


// console.clear();
// iocTest1();
// iocTest2();


export const EpochWorkspace = ( { routes }: any ) => {
   const modalContext = useContext( ModalRefContext );
   const toastContext = useContext( ToastRefContext );

   const addToast = () => {
      toastContext.current?.addMessage( {
         mode: 'info',
         message: 'TOAST',
         autoClose: true,
         autoCloseTime: 2500
      } );
   };

   const addModal = () => {
      modalContext.current?.addModal( Modal );
   };


   return (
      <div>
         EPOCH WORKSPACE
         <button onClick={ () => addModal() }>CREATE A MODAL</button>
         <button onClick={ () => addToast() }>CREATE A TOAST</button>
      </div>
   );
};