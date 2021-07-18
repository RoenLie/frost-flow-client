import React, { useRef, useState } from 'react';
import styles from './styles.module.css';
import { ForwardToastPortal, IToastPortal } from 'components';


export const ToastApp = () => {
   const toastRef = useRef<IToastPortal>();
   const [ text, setText ] = useState( '' );
   const [ mode, setMode ] = useState( 'info' );
   const [ autoClose, setAutoClose ] = useState( false );

   const addToast = () => {
      toastRef.current?.addMessage( {
         mode,
         message: text,
         autoClose: true,
         autoCloseTime: Math.floor( ( Math.random() * 10000 ) + 2000 )
      } );
   };


   return (
      <div className={ styles.main }>
         <h1>Portals and Toast</h1>
         <div className={ styles.content }>
            <img
               alt="toaster"
               src="/assets/toaster.svg"
               className={ styles.toaster }
            />
            <form
               onSubmit={ e => {
                  e.preventDefault();
                  if ( text ) {
                     addToast();
                     setText( '' );
                  }
               } }
            >
               <div className={ styles.autoClose }>
                  <input
                     type="checkbox"
                     checked={ autoClose }
                     onChange={ e => setAutoClose( e.target.checked ) }
                  />
                  <label>Auto Close</label>
               </div>

               <select value={ mode } onChange={ e => setMode( e.target.value ) }>
                  <option value="info">Info</option>
                  <option value="success">Success</option>
                  <option value="warning">Warning</option>
                  <option value="error">Error</option>
               </select>

               <input
                  type="text"
                  value={ text }
                  placeholder="Toast Value"
                  onChange={ e => setText( e.target.value ) }
               />

               <button>Submit</button>
            </form>
         </div>

         {/* <ForwardToastPortal ref={ toastRef } autoClose={ autoClose } /> */ }
      </div>
   );
};