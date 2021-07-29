import { VirtualScrollApi } from "features/virtual-scroll/VirtualListGridApi";

export const useResizeColumn = ( api: VirtualScrollApi ) => {
   const columnResizeEvents = {
      field: '',
      resizing: false,
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

         this.resizing = true;

         requestAnimationFrame( () => {
            const rects = this.getRects();
            if ( !rects ) return;

            const width = e.x - rects.left;

            api.listApi.customColDefs = {
               ...api.listApi.customColDefs,
               [ this.field ]: {
                  ...api.listApi.customColDefs[ this.field ],
                  width
               }
            };

            api.rerender?.();
         } );
      },
      subscribe() {
         this.subscriptions.push(
            [ 'mousemove', this.mousemove.bind( this ) ],
            [ 'mouseup', this.mouseup.bind( this ) ]
         );
         this.subscriptions.forEach( ( sub ) => addEventListener( sub[ 0 ], sub[ 1 ] ) );
      },
      unsubscribe() {
         if ( this.resizing ) api.listApi.resizeColumnPublisher.publish();

         this.subscriptions.forEach( ( sub ) => removeEventListener( sub[ 0 ], sub[ 1 ] ) );
         this.subscriptions.length = 0;
         this.resizing = false;
      }
   };

   return { columnResizeEvents };
};