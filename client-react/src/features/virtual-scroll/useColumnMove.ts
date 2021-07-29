import { VirtualScrollApi } from "features/virtual-scroll/VirtualListGridApi";
import { useForceUpdate } from "hooks";
import { useState } from "react";
import { createCSSSelector } from "shared/helpers/createCSSSelector";
import styles from './styles.module.css';


export const useMoveColumn = ( api: VirtualScrollApi ) => {
   const columnMoveEvents = {
      field: '',
      dragId: '',
      dragging: false,
      originalPos: [ 0, 0 ],
      subscriptions: [] as Array<[ keyof WindowEventMap, any ]>,
      mousedown( e: MouseEvent, field: string, id: string ) {
         e.preventDefault();

         const el = document.getElementById( id );
         if ( e.buttons !== 1 || !el ) return;

         this.originalPos = [ e.clientX, e.clientY ];
         this.field = field;
         $columnMouseenterEvent.field = field;

         this.dragId = 'listgrid-drag-' + field;

         this.subscribe();
      },
      mousemove( e: MouseEvent ) {
         e.preventDefault();

         if ( e.buttons !== 1 ) {
            this.unsubscribe();
            return;
         }

         if ( !this.dragging ) {
            const travelDistance = [
               Math.abs( e.clientX - this.originalPos[ 0 ] ),
               Math.abs( e.clientY - this.originalPos[ 1 ] )
            ];
            const sufficientDistance = travelDistance.some( d => d > 15 );

            if ( !sufficientDistance ) return;

            createCSSSelector( '.cursorMove *', 'cursor:move !important;' );
            document.body.classList.add( 'cursorMove' );

            this.dragging = true;

            $columnMouseenterEvent.dragging = true;

            const div: HTMLDivElement = document.createElement( 'div' );
            div.id = this.dragId;
            div.setAttribute( 'style',
               `left: ${ this.originalPos[ 0 ] - ( 15 ) }px;` +
               `top: ${ this.originalPos[ 1 ] - ( 10 ) }px;`
            );

            div.classList.add( styles.headerFieldDrag );

            document.getElementsByTagName( 'body' )[ 0 ].appendChild( div );
         }

         requestAnimationFrame( ( () => {
            const el = document.getElementById( this.dragId );
            if ( !el ) return;

            const offset = [ e.clientX - this.originalPos[ 0 ], e.clientY - this.originalPos[ 1 ] ];
            el.style.willChange = 'transform';
            el.style.transform = `translate(${ offset[ 0 ] }px, ${ offset[ 1 ] }px)`;
         } ) );
      },
      mouseup() {

         this.unsubscribe();
      },
      subscribe() {
         this.subscriptions.push(
            [ 'mousemove', this.mousemove.bind( this ) ],
            [ 'mouseup', this.mouseup.bind( this ) ]
         );
         this.subscriptions.forEach( ( sub ) => addEventListener( sub[ 0 ], sub[ 1 ] ) );
      },
      unsubscribe() {
         if ( this.dragging ) api.listApi.moveColumnPublisher.publish();

         this.field = '';
         this.dragging = false;
         $columnMouseenterEvent.field = '';
         $columnMouseenterEvent.dragging = false;
         document.body.classList.remove( 'cursorMove' );
         document.getElementById( this.dragId )?.remove();
         this.subscriptions.forEach( ( sub ) => removeEventListener( sub[ 0 ], sub[ 1 ] ) );
         this.subscriptions.length = 0;
      }
   };


   const columnMouseenterEvent = {
      field: '',
      dragging: false,

      mouseenter( e: MouseEvent, moveable: boolean = true, field: string ) {
         if ( e.buttons !== 1 ) return;
         if ( !this.dragging || !moveable || this.field == field ) return;

         const order1 = api.listApi.customColDefs[ this.field ].order;
         const order2 = api.listApi.customColDefs[ field ].order;

         api.listApi.customColDefs = {
            ...api.listApi.customColDefs,
            [ this.field ]: {
               ...api.listApi.customColDefs[ this.field ],
               order: order2
            },
            [ field ]: {
               ...api.listApi.customColDefs[ field ],
               order: order1
            }
         };

         api.rerender?.();
      }
   };


   /* this one must be set as a state because mouseenter is unable to hold it's fields after a rerender. */
   const [ $columnMouseenterEvent ] = useState( columnMouseenterEvent );

   return { columnMoveEvents, $columnMouseenterEvent };
};