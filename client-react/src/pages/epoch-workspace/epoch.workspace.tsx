import React from 'react';
import styles from './styles.module.css';
import { rootModalPortalService, rootToastPortalService } from "features/layout";
import { Modal } from "features/modal";
import { iocTest1, iocTest2 } from "shared"; $: 'ioc';


// console.clear();
// iocTest1();
// iocTest2();


export const EpochWorkspace = ( { routes }: any ) => {
   const addToast = () => {
      rootToastPortalService.addMessage( {
         mode: 'info',
         message: 'TOAST',
         autoClose: true,
         autoCloseTime: 2500
      } );
   };

   const addModal = () => {
      rootModalPortalService.addModal( Modal );
   };


   return (
      <div>
         EPOCH WORKSPACE
         <button onClick={ () => addModal() }>CREATE A MODAL</button>
         <button onClick={ () => addToast() }>CREATE A TOAST</button>
      </div>
   );
};