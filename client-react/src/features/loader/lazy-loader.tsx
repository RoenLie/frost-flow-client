import { Loader } from "features/loader";
import React from "react";
import { FC, useEffect, useState } from 'react';

export interface LazyLoaderProps {
   delay?: number;
}

const LazyLoader: FC<LazyLoaderProps> = ( {
   delay = 250,
   ...props
} ) => {
   const [ show, setShow ] = useState( false );

   useEffect( () => {
      const timeout = setTimeout( () => {
         setShow( true );
      }, delay );
      return () => {
         clearTimeout( timeout );
      };
   }, [ delay ] );

   return show ? <Loader loading={ true } /> : null;;
};

export { LazyLoader as default };