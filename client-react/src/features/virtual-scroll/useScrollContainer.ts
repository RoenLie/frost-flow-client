import { useEffect, useRef, useState } from "react";


interface useScrollContainerProps { initialHeight?: number, ref?: any, modifier?: number; }
export const useScrollContainer = (
   { initialHeight = 0, ref, modifier = 0 }: useScrollContainerProps
) => {
   const [ containerHeight, setContainerHeight ] = useState( initialHeight );
   const containerRef = ref || useRef<HTMLDivElement>( null );

   const calcContainerHeight = () => {
      const el = containerRef.current;
      if ( !el ) return;

      const rects = el.getBoundingClientRect();

      const containerHeight = rects.bottom > window.innerHeight
         ? window.innerHeight - rects.top - 1
         : rects.height;

      requestAnimationFrame( () => {
         setContainerHeight( containerHeight + modifier );
      } );
   };


   useEffect( () => {
      calcContainerHeight();
      addEventListener( 'resize', calcContainerHeight );
      return () => removeEventListener( 'resize', calcContainerHeight );
   }, [] );


   return [
      containerHeight,
      containerRef,
      calcContainerHeight
   ] as [ number, React.RefObject<HTMLDivElement>, () => void ];
};