import { LoaderSpinner } from "features/loader/spinner";
import React, { CSSProperties, FunctionComponent, memo } from "react";

interface ILoader {
   loading: boolean;
};
export const Loader: FunctionComponent<ILoader> = memo( ( { loading, children } ) => {
   const loaderWrapperStyle = {
      position: 'relative',
      display: 'grid',
      gridAutoFlow: 'row dense',
      overflow: 'hidden'
   } as CSSProperties;
   const loaderBlurStyle = {
      position: 'absolute',
      display: 'grid',
      gridAutoFlow: 'row dense',
      overflow: 'hidden',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.2)',
      filter: 'blur(1px)',
      zIndex: 1,
      pointerEvents: 'none',
      userSelect: 'none'
   } as CSSProperties;
   const loaderIconStyle = {
      position: 'absolute',
      placeSelf: 'center',
      zIndex: 2,
   } as CSSProperties;

   return loading
      ? (
         <div style={ loaderWrapperStyle }>
            <div style={ loaderBlurStyle }>{ children }</div>
            <div style={ loaderIconStyle }>
               <LoaderSpinner scale={ 1 }></LoaderSpinner>
            </div>
         </div>
      )
      : <>{ children }</>;
} );