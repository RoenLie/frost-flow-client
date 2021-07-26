import React, { useEffect, useRef } from "react";
import { unmountComponentAtNode } from "react-dom";

export const ReactComment = (
   { text, trim = true }: { text: string, trim?: boolean; }
) => {
   const ref = useRef<HTMLDivElement>( null );

   const createComment = () => `<!-- ${ trim ? text.trim() : text } -->`;

   useEffect( ( () => {
      const el = ref.current;
      if ( !el ) return;

      unmountComponentAtNode( el );
      el.outerHTML = createComment();
   } ), [] );


   return <div ref={ ref } />;
};