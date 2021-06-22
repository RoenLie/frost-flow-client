import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


interface ResizeElement {
   element: Element;
   index: number;
   maxWidth?: number;
   minWidth?: number;
}


@Injectable( { providedIn: "platform" } )
export class ResizeService {
   hostRect: DOMRect;
   hostEl: Element;
   resizeElements: ResizeElement[] = [];

   fractions = new BehaviorSubject<number[]>( [] );

   constructor () { }

   resetFractions() {
      const style = window.getComputedStyle( this.hostEl );
      const gridTemplateColumns = style.getPropertyValue( "grid-template-columns" );
      const newGridTemplateColumns = gridTemplateColumns
         .replace( /px/g, "" )
         .split( " " )
         .map( ( f, i ) => {
            const fraction = Number( f );
            const minWidth = this.resizeElements[ i ]?.minWidth || 0;
            return fraction > minWidth ? fraction : minWidth;
         } );
      this.fractions.next( newGridTemplateColumns );
   }

   setFractions( index: number, targetIndex: number, fraction: number, diff: number ) {
      const fracs = this.fractions.value;

      const reEl = this.resizeElements[ index ];
      const width = fraction;
      if ( width < ( reEl.minWidth || 0 ) ) return false;

      fracs[ index ] = fraction;

      const tarEl = this.resizeElements[ targetIndex ];
      const targetWidth = fracs[ targetIndex ] - diff;
      if ( targetWidth < ( tarEl.minWidth || 0 ) ) return;

      fracs[ targetIndex ] -= diff;

      this.fractions.next( fracs );

      return true;
   }
}