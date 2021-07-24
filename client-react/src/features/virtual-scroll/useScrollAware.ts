import { useRef, useState, useEffect } from "react";

// Generic hook for detecting scroll:
export const useScrollAware = () => {
   const [ scrollTop, setScrollTop ] = useState( 0 );
   const ref = useRef<HTMLElement>();

   const onScroll = ( e: Event ) => {
      const ev = e as Event & { target: HTMLElement; };
      requestAnimationFrame( () => setScrollTop( ev?.target?.scrollTop ) );
   };

   useEffect( () => {
      const scrollContainer = ref.current;
      if ( !scrollContainer ) return;

      setScrollTop( scrollContainer.scrollTop );
      scrollContainer.addEventListener( "scroll", onScroll );
      return () => scrollContainer.removeEventListener( "scroll", onScroll );
   }, [] );

   return [ scrollTop, ref ];
};
