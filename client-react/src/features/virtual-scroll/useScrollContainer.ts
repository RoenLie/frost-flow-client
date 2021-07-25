import { useEffect, useRef, useState } from "react";


export const useScrollContainer = ( initialHeight = 0 ) => {
   const [ containerHeight, setContainerHeight ] = useState( initialHeight );
   const containerRef = useRef<HTMLDivElement>( null );

   const calcContainerHeight = () => {
      const el = containerRef.current;
      if ( !el ) return;

      const rects = el.getBoundingClientRect();
      const containerHeight = rects.bottom > window.innerHeight
         ? window.innerHeight - rects.top - 1
         : rects.height;

      setContainerHeight( containerHeight );
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