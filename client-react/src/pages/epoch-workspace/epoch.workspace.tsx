import React from 'react';
import styles from './styles.module.css';
import { Modal, rootModalService } from "features/modal";
import { rootToastService } from "features/toast";
import { layoutService } from "features";
// $: 'ioc'; import { iocTest1, iocTest2 } from "shared";
// console.clear();
// iocTest1();
// iocTest2();


export const EpochWorkspace = () => {
   const addToast = () => {
      rootToastService.addMessage( {
         mode: 'info',
         message: 'TOAST',
         autoClose: true,
         autoCloseTime: 2500
      } );
   };

   const addModal = () => {
      rootModalService.addModal( { component: Modal } );
   };

   const changeLayout = () => {
      layoutService.setLayout.admin();
   };


   return (
      <div>
         EPOCH WORKSPACE
         <button onClick={ addModal }>CREATE A MODAL</button>
         <button onClick={ addToast }>CREATE A TOAST</button>
         <button onClick={ changeLayout }>CHANGE LAYOUT</button>
      </div>
   );
};