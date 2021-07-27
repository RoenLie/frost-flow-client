import { Dispatch, useState } from "react";

export const useResizeColumn = ( customColDefs: any, setCustomColDefs: Dispatch<any> ) => {
   const columnResizeEvents = {
      customColDefs,
      field: '',
      element: null as HTMLElement | null,
      subscriptions: [] as Array<[ keyof WindowEventMap, any ]>,
      getRects() { return this.element?.getBoundingClientRect(); },
      mousedown( e: MouseEvent, field: string ) {
         const target = e.target as HTMLElement;
         this.element = target.parentElement?.parentElement as HTMLElement;
         this.field = field;
         this.subscribe();
      },
      mouseup() {
         this.unsubscribe();
      },
      mousemove( e: MouseEvent ) {
         e.preventDefault();

         if ( e.buttons !== 1 ) {
            this.unsubscribe();
            return;
         }

         requestAnimationFrame( () => {
            const rects = this.getRects();
            if ( !rects ) return;

            const colDef = this.customColDefs[ this.field ];
            const width = e.x - rects.left;

            setCustomColDefs( { ...this.customColDefs, [ this.field ]: { ...colDef, width } } );
         } );
      },
      subscribe() {
         this.subscriptions.push( [ 'mousemove', this.mousemove.bind( this ) ] );
         this.subscriptions.push( [ 'mouseup', this.mouseup.bind( this ) ] );
         this.subscriptions.forEach( ( sub ) => addEventListener( sub[ 0 ], sub[ 1 ] ) );
      },
      unsubscribe() {
         this.subscriptions.forEach( ( sub ) => removeEventListener( sub[ 0 ], sub[ 1 ] ) );
         this.subscriptions.length = 0;

         setTriggerResizeColumnEnd( v => v + 1 );
      }
   };

   const [ $triggerResizeColumnEnd, setTriggerResizeColumnEnd ] = useState( 0 );

   return { columnResizeEvents, $triggerResizeColumnEnd };
};