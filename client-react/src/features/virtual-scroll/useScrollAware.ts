import { useRef, useState, useEffect } from "react";


interface FlexibleHTMLElement extends HTMLElement { [ key: string ]: any; };


export const useScrollAware = () => {
   const [ $scrollTop, setScrollTop ] = useState( 0 );
   const [ $scrollDirection, setScrollDirection ] = useState( 0 );
   const ref = useRef<HTMLElement>();

   const onScroll = ( e: Event ) => {
      const ev = e as Event & { target: HTMLElement; };
      const scrollContainer = ref.current as FlexibleHTMLElement;
      if ( !scrollContainer ) return;

      requestAnimationFrame( () => {
         setScrollDirection( Math.sign( ev?.target?.scrollTop - scrollContainer.lastScrollTop ) );
         setScrollTop( ev?.target?.scrollTop );
         scrollContainer.lastScrollTop = ev?.target?.scrollTop;
      } );
   };

   useEffect( () => {
      const scrollContainer = ref.current as FlexibleHTMLElement;
      if ( !scrollContainer ) return;

      scrollContainer.lastScrollTop = scrollContainer.scrollTop;
      setScrollTop( scrollContainer.scrollTop );
      scrollContainer.addEventListener( "scroll", onScroll );

      return () => scrollContainer.removeEventListener( "scroll", onScroll );
   }, [] );


   return [ $scrollTop, $scrollDirection, ref ];
};
