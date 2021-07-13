import { SvgIcon } from "core";
import React, { createRef, useEffect, useMemo, useState } from "react";
import styles from './styles.module.css';


export const ModalWrapper = ( { onClose, children }: any ) => {
   const [ position, setPosition ] = useState( [ 0, 0 ] );
   const [ dynamicPos, setDynamicPos ] = useState( [ 0, 0 ] );
   const wrapperRef = createRef<HTMLDivElement>();
   const cursorOffset = [ 0, 0 ];


   useEffect( () => {
      const rects = wrapperRef.current?.getBoundingClientRect();
      if ( !rects ) return;
      if ( rects.x == position[ 0 ] && rects.y == position[ 1 ] ) return;

      setPosition( [ rects.x, rects.y ] );
   }, [] );

   const events: any = {
      element: undefined as any,
      mousedown: ( e: MouseEvent ) => {
         events.element = wrapperRef.current;
         const rects = events.element?.getBoundingClientRect();
         if ( !rects ) return;

         const rect = [ rects.left, rects.top ];
         const curs = [ e.clientX, e.clientY ];

         cursorOffset[ 0 ] = curs[ 0 ] - rect[ 0 ];
         cursorOffset[ 1 ] = curs[ 1 ] - rect[ 1 ];

         events.subscribe();
      },
      mouseup: () => {
         events.unsubscribe();
         const rects = events.element.getBoundingClientRect();
         setDynamicPos( [ 0, 0 ] );
         setPosition( [ rects.x, rects.y ] );
      },
      mousemove: ( e: MouseEvent ) => {
         if ( e.buttons !== 1 ) events.unsubscribe();
         e.preventDefault();

         const curs = [ e.clientX, e.clientY ];
         const modCurs = [ curs[ 0 ] - cursorOffset[ 0 ], curs[ 1 ] - cursorOffset[ 1 ] ];

         const rects = events.element.getBoundingClientRect() as ClientRect;

         const offset = [
            modCurs[ 0 ] + rects.width < window.innerWidth && modCurs[ 0 ] > 1 ? modCurs[ 0 ]
               : modCurs[ 0 ] <= 1 ? 1
                  : window.innerWidth - rects.width,
            modCurs[ 1 ] + rects.height < window.innerHeight && modCurs[ 1 ] > 1 ? modCurs[ 1 ]
               : modCurs[ 1 ] <= 1 ? 1
                  : window.innerHeight - rects.height
         ];

         setDynamicPos( [ offset[ 0 ], offset[ 1 ] ] );
      },
      subscribe: () => {
         addEventListener( 'mousemove', events.mousemove );
         addEventListener( 'mouseup', events.mouseup );
      },
      unsubscribe: () => {
         removeEventListener( 'mousemove', events.mousemove );
         removeEventListener( 'mouseup', events.mouseup );
      }
   };

   const style = useMemo(
      () => {
         if ( !dynamicPos[ 0 ] && !dynamicPos[ 1 ] ) {
            return { left: `${ position[ 0 ] }px`, top: `${ position[ 1 ] }px` };
         } else {
            return { transform: `translate(${ dynamicPos[ 0 ] }px, ${ dynamicPos[ 1 ] }px)` };
         }
      },
      [ dynamicPos, position ]
   );

   // onDestroy hook
   useEffect( () => () => { events.unsubscribe(); }, [] );

   return (
      <div ref={ wrapperRef }
         className={ styles.modalWrapper }
         style={ style }
         onMouseDown={ events.mousedown }>
         <section>
            <div onClick={ onClose }>
               <SvgIcon svgName="times_solid"></SvgIcon>
            </div>
         </section>
         <section>
            { children }
         </section>
      </div>
   );
};