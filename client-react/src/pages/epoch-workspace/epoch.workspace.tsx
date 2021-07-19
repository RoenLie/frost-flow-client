import React from 'react';
import styles from './styles.module.css';
import { Modal, rootModalService } from "features/modal";
import { rootToastService } from "features/toast";
$: 'ioc'; import { iocTest1, iocTest2 } from "shared";


console.clear();
iocTest1();
iocTest2();


export const EpochWorkspace = ( { routes }: any ) => {
   const addToast = () => {
      rootToastService.addMessage( {
         mode: 'info',
         message: 'TOAST',
         autoClose: true,
         autoCloseTime: 2500
      } );
   };

   const addModal = () => {
      rootModalService.addModal( Modal );
   };


   return (
      <div>
         EPOCH WORKSPACE
         <button onClick={ () => addModal() }>CREATE A MODAL</button>
         <button onClick={ () => addToast() }>CREATE A TOAST</button>
      </div>
   );
};