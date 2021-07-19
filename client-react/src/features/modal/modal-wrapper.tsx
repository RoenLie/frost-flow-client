import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { SvgIcon } from "core";
import styles from './styles.module.css';


export type ModalSize = 'small' | 'medium' | 'large' | 'xlarge' | 'full';
export interface IModalWrapperProps {
   id?: string;
   onClose: () => void;
   component: any;
   resizeable: boolean;
   moveable: boolean;
   size?: ModalSize;
   children: never[];
}


export const ModalWrapper = ( { onClose, component: Modal, resizeable, moveable, size, id }: IModalWrapperProps ) => {
   const [ position, setPosition ] = useState( [ 0, 0 ] );
   const [ dynamicPos, setDynamicPos ] = useState( [ 0, 0 ] );
   const [ dimensions, setDimensions ] = useState( [ '0px', '0px' ] );
   const wrapperRef = useRef<HTMLDivElement>( null );
   const cursorOffset = [ 0, 0 ];
   const modalSizes = {
      small: [ 'clamp(20rem, 20vw, 30rem)', 'clamp(20rem, 20vh, 30rem)' ],
      medium: [ 'clamp(20rem, 30vw, 40rem)', 'clamp(20rem, 30vh, 40rem)' ],
      large: [ 'clamp(20rem, 50vw, 50rem)', 'clamp(20rem, 50vh, 50rem)' ],
      xlarge: [ 'clamp(20rem, 70vw, 70rem)', 'clamp(20rem, 70vh, 70rem)' ],
      full: [ '100vw', '100vh' ]
   };

   if ( size == "full" ) { resizeable = false; moveable = false; }

   // onLoad hook
   useEffect( () => {
      const rects = wrapperRef.current?.getBoundingClientRect();
      if ( !rects ) return;

      if ( size ) {
         setDimensions( [ modalSizes[ size ][ 0 ], modalSizes[ size ][ 1 ] ] );
         return;
      }

      const center = [ window.innerWidth / 2, window.innerHeight / 2 ];
      const modCenter = [ center[ 0 ] - rects.width / 2, center[ 1 ] - rects.height / 2 ];

      setDimensions( [ rects.width + 'px', rects.height + 'px' ] );
      setPosition( modCenter );
   }, [] );

   // onDestroy hook
   useEffect( () => () => { modalMoveEvents.unsubscribe(); modalResizeEvents.unsubscribe(); }, [] );

   const wrapperStyle = useMemo( () => {
      const styleObj: { [ key: string ]: any; } = { width: dimensions[ 0 ], height: dimensions[ 1 ] };
      if ( !wrapperRef.current ) {
         styleObj.opacity = 0;
         styleObj.position = 'relative';
         return styleObj;
      }

      if ( dynamicPos[ 0 ] && dynamicPos[ 1 ] ) {
         styleObj.transform = `translate(${ dynamicPos[ 0 ] }px,${ dynamicPos[ 1 ] }px)`;
         return styleObj;
      }

      if ( position[ 0 ] && position[ 1 ] ) {
         styleObj.left = `${ position[ 0 ] }px`;
         styleObj.top = `${ position[ 1 ] }px`;
         return styleObj;
      }

      const rects = wrapperRef.current.getBoundingClientRect();
      styleObj.left = `${ rects.left - rects.width / 2 }px`;
      styleObj.top = `${ rects.top - rects.height / 2 }px`;

      return styleObj;
   },
      [ dynamicPos, position, dimensions, wrapperRef ]
   );

   const headerClasses = useMemo( () => {
      return [ styles.header, moveable ? styles.moveable : '' ].filter( Boolean ).join( ' ' );
   },
      [ moveable ]
   );

   const modalMoveEvents: any = {
      element: undefined as any,
      getRects: () => modalMoveEvents.element.getBoundingClientRect(),
      mousedown: ( e: MouseEvent ) => {
         if ( !moveable ) return;

         modalMoveEvents.element = wrapperRef.current;
         const rects = modalMoveEvents.element?.getBoundingClientRect();
         if ( !rects ) return;

         const rect = [ rects.left, rects.top ];
         const curs = [ e.clientX, e.clientY ];

         cursorOffset[ 0 ] = curs[ 0 ] - rect[ 0 ];
         cursorOffset[ 1 ] = curs[ 1 ] - rect[ 1 ];

         modalMoveEvents.subscribe();
      },
      mouseup: () => {
         modalMoveEvents.unsubscribe();
         const rects = modalMoveEvents.element.getBoundingClientRect();
         setDynamicPos( [ 0, 0 ] );
         setPosition( [ rects.x, rects.y ] );
      },
      mousemove: ( e: MouseEvent ) => {
         if ( e.buttons !== 1 ) modalMoveEvents.unsubscribe();
         e.preventDefault();

         const curs = [ e.clientX, e.clientY ];
         const modCurs = [ curs[ 0 ] - cursorOffset[ 0 ], curs[ 1 ] - cursorOffset[ 1 ] ];

         const rects = modalMoveEvents.element.getBoundingClientRect() as ClientRect;

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
         addEventListener( 'mousemove', modalMoveEvents.mousemove );
         addEventListener( 'mouseup', modalMoveEvents.mouseup );
      },
      unsubscribe: () => {
         removeEventListener( 'mousemove', modalMoveEvents.mousemove );
         removeEventListener( 'mouseup', modalMoveEvents.mouseup );
      }
   };

   const modalResizeEvents: any = {
      element: undefined as any,
      getRects: () => modalResizeEvents.element.getBoundingClientRect(),
      mousedown: ( e: MouseEvent ) => {
         if ( !resizeable ) return;

         modalResizeEvents.element = wrapperRef.current;
         const rects = modalResizeEvents.element?.getBoundingClientRect();
         if ( !rects ) return;

         const rect = [ rects.right, rects.bottom ];
         const curs = [ e.clientX, e.clientY ];

         cursorOffset[ 0 ] = rect[ 0 ] - curs[ 0 ];
         cursorOffset[ 1 ] = rect[ 1 ] - curs[ 1 ];

         modalResizeEvents.subscribe();
      },
      mouseup: () => {
         modalResizeEvents.unsubscribe();
      },
      mousemove: ( e: MouseEvent ) => {
         if ( e.buttons !== 1 ) modalResizeEvents.unsubscribe();
         e.preventDefault();

         const rects = modalResizeEvents.getRects();
         const { innerWidth: wWidth, innerHeight: wHeight } = window;

         const cursorX = e.clientX + cursorOffset[ 0 ];
         const cursorY = e.clientY + cursorOffset[ 1 ];
         const limitedX = cursorX > 1 && cursorX < wWidth ? cursorX : cursorX > wWidth ? wWidth : 1;
         const limitedY = cursorY > 1 && cursorY < wHeight ? cursorY : cursorY > wHeight ? wHeight : 1;

         const size: ( string | number )[] = [ limitedX - rects.left, limitedY - rects.top ];

         size[ 0 ] = size[ 0 ] + 'px';
         size[ 1 ] = size[ 1 ] + 'px';

         setDimensions( size as string[] );
      },
      subscribe: () => {
         addEventListener( 'mousemove', modalResizeEvents.mousemove );
         addEventListener( 'mouseup', modalResizeEvents.mouseup );
      },
      unsubscribe: () => {
         removeEventListener( 'mousemove', modalResizeEvents.mousemove );
         removeEventListener( 'mouseup', modalResizeEvents.mouseup );
      }
   };

   return (
      <div ref={ wrapperRef }
         className={ styles.modalWrapper }
         style={ wrapperStyle }
      >
         <section onMouseDown={ modalMoveEvents.mousedown } className={ headerClasses }>
            <div>test{ id }</div>
            <div onClick={ onClose }>
               <SvgIcon svgName="times_solid" size="small"></SvgIcon>
            </div>
         </section>

         <section className={ styles.content }>
            <Modal onClose={ onClose }></Modal>
         </section>

         <section className={ styles.footer }>
            { resizeable ? (
               <div onMouseDown={ modalResizeEvents.mousedown }>
                  <SvgIcon svgName="signal_solid" size="small"></SvgIcon>
               </div>
            ) : <></> }
         </section>
      </div>
   );
};

export const MemoModalWrapper = memo( ModalWrapper );