import React, { useMemo } from 'react';
import styles from './styles.module.css';


export interface IToastComponent {
   mode: ToastMode;
   message: string;
   onClose?: any;
   autoClose?: boolean;
   autoCloseTime?: number;
}
type ToastMode = 'info' | 'success' | 'warning' | 'error';


export const Toast = ( { mode, onClose, message }: IToastComponent ) => {
   const classes = useMemo(
      () => [ styles.toast, styles[ mode ] ].join( ' ' ),
      [ mode ],
   );

   return (
      <div onClick={ onClose } className={ classes }>
         <div className={ styles.message }>{ message }</div>
      </div>
   );
};