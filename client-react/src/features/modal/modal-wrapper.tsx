import React, { memo, MouseEventHandler, useEffect, useMemo, useRef, useState } from "react";
import { SvgIcon } from "core";
import styles from './styles.module.css';


export type ModalSize = 'small' | 'medium' | 'large' | 'xlarge' | 'full';


export interface IModalWrapperProps {
   id?: string;
   component: any;
   onClose?: () => void;
   resizeable?: boolean;
   moveable?: boolean;
   size?: ModalSize;
   logger?: IModalLogger;
   children?: never[];
}


export interface IModalLogger {
   logInfo: ( msg: string ) => void;
}


class DefaultModalLogger implements IModalLogger {
   logInfo( msg: string ) {
      // console.log( msg, new Date().toTimeString().split( ' ' )[ 0 ] );
   }
}


export const ModalWrapper = (
   { id, component: Modal, onClose, resizeable, moveable, size, logger = new DefaultModalLogger() }: IModalWrapperProps
) => {
   const wrapperRef = useRef<HTMLDivElement>( null );
   const [ position, setPosition ] = useState( [ 0, 0 ] );
   const [ dynamicPos, setDynamicPos ] = useState( [ 0, 0 ] );
   const [ dimensions, setDimensions ] = useState( [ '0px', '0px' ] );

   const cursorOffset = [ 0, 0 ];
   const modalSizes = {
      small: [ 'clamp(20rem, 20vw, 30rem)', 'clamp(20rem, 20vh, 30rem)' ],
      medium: [ 'clamp(20rem, 30vw, 40rem)', 'clamp(20rem, 30vh, 40rem)' ],
      large: [ 'clamp(20rem, 50vw, 50rem)', 'clamp(20rem, 50vh, 50rem)' ],
      xlarge: [ 'clamp(20rem, 70vw, 70rem)', 'clamp(20rem, 70vh, 70rem)' ],
      full: [ '100vw', '100vh' ]
   };

   if ( size == "full" ) { resizeable = false; moveable = false; }

   const modalMoveEvents = {
      element: null as HTMLElement | null,
      subscriptions: [] as Array<[ keyof WindowEventMap, any ]>,
      getRects() { return this.element?.getBoundingClientRect(); },
      mousedown( e: MouseEvent ) {
         if ( !moveable ) return;

         this.element = wrapperRef.current;
         const rects = this.element?.getBoundingClientRect();
         if ( !rects ) return;

         const rect = [ rects.left, rects.top ];
         const curs = [ e.clientX, e.clientY ];

         cursorOffset[ 0 ] = curs[ 0 ] - rect[ 0 ];
         cursorOffset[ 1 ] = curs[ 1 ] - rect[ 1 ];

         this.subscribe();
      },
      mouseup() {
         this.unsubscribe();

         const rects = this.element?.getBoundingClientRect();
         if ( !rects ) return;

         setDynamicPos( [ 0, 0 ] );
         setPosition( [ rects.x, rects.y ] );
      },
      mousemove( e: MouseEvent ) {
         if ( e.buttons !== 1 ) this.unsubscribe();
         e.preventDefault();

         const curs = [ e.clientX, e.clientY ];
         const modCurs = [ curs[ 0 ] - cursorOffset[ 0 ], curs[ 1 ] - cursorOffset[ 1 ] ];

         const rects = this.element?.getBoundingClientRect() as ClientRect;

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
      subscribe() {
         logger.logInfo( 'modalMoveEvents subscribe' );

         this.subscriptions.push( [ 'mousemove', this.mousemove.bind( this ) ] );
         this.subscriptions.push( [ 'mouseup', this.mouseup.bind( this ) ] );

         this.subscriptions.forEach( ( sub ) => addEventListener( sub[ 0 ], sub[ 1 ] ) );
      },
      unsubscribe() {
         logger.logInfo( 'modalMoveEvents unsubscribe' );

         this.subscriptions.forEach( ( sub ) => removeEventListener( sub[ 0 ], sub[ 1 ] ) );
      }
   };

   const modalResizeEvents = {
      element: null as HTMLElement | null,
      subscriptions: [] as Array<[ keyof WindowEventMap, any ]>,
      getRects() { return this.element?.getBoundingClientRect(); },
      mousedown( e: MouseEvent ) {
         if ( !resizeable ) return;

         this.element = wrapperRef.current;

         const rects = this.element?.getBoundingClientRect();
         if ( !rects ) return;

         const rect = [ rects.right, rects.bottom ];
         const curs = [ e.clientX, e.clientY ];

         cursorOffset[ 0 ] = rect[ 0 ] - curs[ 0 ];
         cursorOffset[ 1 ] = rect[ 1 ] - curs[ 1 ];

         this.subscribe();
      },
      mouseup() {
         this.unsubscribe();
      },
      mousemove( e: MouseEvent ) {
         logger.logInfo( 'mouse moving' );

         if ( e.buttons !== 1 ) this.unsubscribe();
         e.preventDefault();

         const rects = this.getRects();
         if ( !rects ) return;

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
      subscribe() {
         logger.logInfo( 'modalResizeEvents subscribe' );

         this.subscriptions.push( [ 'mousemove', this.mousemove.bind( this ) ] );
         this.subscriptions.push( [ 'mouseup', this.mouseup.bind( this ) ] );

         this.subscriptions.forEach( ( sub ) => addEventListener( sub[ 0 ], sub[ 1 ] ) );
      },
      unsubscribe() {
         logger.logInfo( 'modalResizeEvents unsubscribe' );

         this.subscriptions.forEach( ( sub ) => removeEventListener( sub[ 0 ], sub[ 1 ] ) );
      }
   };

   const windowResizeEvents = {
      resize() {
         logger.logInfo( 'resizing window' );
      },
      subscribe() {
         logger.logInfo( 'subscribing to window resize events' );

         window.addEventListener( 'resize', this.resize );
      },
      unsubscribe() {
         logger.logInfo( 'unsubscribing to window resize events' );
         window.removeEventListener( 'resize', this.resize );
      }
   };

   // onload before render hook.
   useMemo( () => {
      logger.logInfo( 'onload before render hook.' );
      if ( size ) setDimensions( [ modalSizes[ size ][ 0 ], modalSizes[ size ][ 1 ] ] );
   }, [] );

   // onload after render hook.
   useEffect( () => {
      logger.logInfo( 'onload after render hook.' );
      windowResizeEvents.subscribe();
      return () => windowResizeEvents.unsubscribe();
   }, [] );

   // onDestroy hook
   useEffect( () => () => {
      modalMoveEvents.unsubscribe();
      modalResizeEvents.unsubscribe();
   }, [] );

   // runs twice, on load. last time it runs it gets the correct rects.
   useEffect( () => {
      if ( !wrapperRef.current ) return;
      const rects = wrapperRef.current.getBoundingClientRect();
      const center = [ window.innerWidth / 2, window.innerHeight / 2 ];
      const modCenter = [ center[ 0 ] - rects.width / 2, center[ 1 ] - rects.height / 2 ];
      setPosition( modCenter );
   }, [ wrapperRef.current ] );

   // reacts to header parameters to change classes
   const headerClasses = useMemo( () => {
      return [ styles.header, moveable ? styles.moveable : '' ].filter( Boolean ).join( ' ' );
   },
      [ moveable ]
   );

   // reacts to changes in style params to set the correct styling on element
   const wrapperStyle = useMemo( () => {
      const styleObj: { [ key: string ]: any; } = { width: dimensions[ 0 ], height: dimensions[ 1 ] };

      if ( !wrapperRef.current ) {
         styleObj.opacity = 0;
         styleObj.left = '50%';
         styleObj.top = '50%';
         styleObj.transform = 'translate(-50%, -50%)';

         return styleObj;
      }

      if ( !moveable ) {
         styleObj.left = '50%';
         styleObj.top = '50%';
         styleObj.transform = 'translate(-50%, -50%)';
      }

      if ( dynamicPos[ 0 ] && dynamicPos[ 1 ] && moveable ) {
         styleObj.transform = `translate(${ dynamicPos[ 0 ] }px,${ dynamicPos[ 1 ] }px)`;
         return styleObj;
      }

      if ( position[ 0 ] && position[ 1 ] && moveable ) {
         styleObj.left = `${ position[ 0 ] }px`;
         styleObj.top = `${ position[ 1 ] }px`;
      }

      return styleObj;
   },
      [ dynamicPos, position, dimensions ]
   );


   return (
      <div ref={ wrapperRef }
         className={ styles.modalWrapper }
         style={ wrapperStyle }
      >
         <section className={ headerClasses }
            onMouseDown={
               modalMoveEvents.mousedown.bind( modalMoveEvents ) as unknown as MouseEventHandler<HTMLDivElement>
            }>
            <div onClick={ onClose }>
               <SvgIcon svgName="times_solid" size="small"></SvgIcon>
            </div>
         </section>

         <section className={ styles.content }>
            <Modal onClose={ onClose }></Modal>
         </section>

         <section className={ styles.footer }>
            { resizeable ? (
               <div onMouseDown={
                  modalResizeEvents.mousedown.bind( modalResizeEvents ) as unknown as MouseEventHandler<HTMLDivElement>
               }>
                  <SvgIcon svgName="signal_solid" size="small"></SvgIcon>
               </div>
            ) : <></> }
         </section>
      </div>
   );
};

export const MemoModalWrapper = memo( ModalWrapper );