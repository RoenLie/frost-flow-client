import React, { CSSProperties, FunctionComponent } from "react";
import styles from "./spinner.module.css";

type TLoader = { scale?: number; };
export const LoaderSpinner: FunctionComponent<TLoader> = ( { scale = 1 } ) => {
   const spinnerStyle = {
      transform: `scale(${ scale })`
   } as CSSProperties;

   return (
      <div className={ styles.ldsOuterWrapper }>
         <div className={ styles.ldsWrapper }>
            <div
               className={ styles.ldsSpinner }
               style={ spinnerStyle }
            >
               <div />
               <div />
               <div />
               <div />
               <div />
               <div />
               <div />
               <div />
               <div />
               <div />
               <div />
               <div />
            </div>
         </div>
      </div>
   );
};