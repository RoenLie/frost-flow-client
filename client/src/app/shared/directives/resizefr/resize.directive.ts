import { AfterViewInit, Directive, ElementRef, Input, OnDestroy, Renderer2 } from "@angular/core";
import { ResizeOptions } from "@shared/directives/resizefr/resize-options.directive";
import { ResizeService } from "@shared/directives/resizefr/resize.service";


type Direction = "top" | "bottom" | "left" | "right";


@Directive( { selector: "[resizable]" } )
export class ResizableDirective implements AfterViewInit, OnDestroy {
   @Input( "resizable" ) direction: Direction;
   @Input( "resizeOptions" ) options: ResizeOptions;
   @Input() defaultColor: string = "inherit";
   @Input() highlightColor: string = "rgba(150,150,150)";
   @Input() activeColor: string = "rgba(200,200,200)";
   @Input() dynamicResize: boolean = true;
   div: HTMLDivElement;
   ghostDiv: HTMLDivElement;
   mousedownListener: Function;
   mousemoveListener: Function;
   mouseupListener: Function;
   mouseenterListener: Function;
   mouseoutListener: Function;

   x: number;
   y: number;
   xPrev: number;
   yPrev: number;

   constructor (
      private resizeService: ResizeService,
      private elementRef: ElementRef<Element>,
      private rd: Renderer2 ) { }
   ngAfterViewInit() {
      this.createMainDiv();
      this.createEvents();
   }
   createMainDiv() {
      const hostRect = this.elementRef.nativeElement.getBoundingClientRect();

      this.div = this.rd.createElement( "div" );

      this.rd.setStyle( this.div, "position", "absolute" );
      this.rd.setStyle( this.div, "background-color", this.defaultColor );
      this.rd.setStyle( this.div, this.direction, "0" );

      switch ( this.direction ) {
         case "left":
         case "right": {
            this.rd.setStyle( this.div, "height", "100%" );
            this.rd.setStyle( this.div, "width", "0.2rem" );
            this.rd.setStyle( this.div, "cursor", "ew-resize" );
            this.rd.setStyle( this.div, "top", "0" );

            break;
         }
         default:
            console.log( "got into the default" );
            this.rd.setStyle( this.div, "width", "100%" );
            this.rd.setStyle( this.div, "height", "0.2rem" );
            this.rd.setStyle( this.div, "cursor", "ns-resize" );
      }

      this.rd.appendChild( this.elementRef.nativeElement, this.div );
   }
   createGhostDiv() {
      const parentRect = this.div.getBoundingClientRect();

      this.ghostDiv = this.rd.createElement( "div" );
      this.rd.setStyle( this.ghostDiv, "position", "fixed" );
      this.rd.setStyle( this.ghostDiv, "z-index", "1" );
      this.rd.setStyle( this.ghostDiv, "height", parentRect.height + "px" );
      this.rd.setStyle( this.ghostDiv, "user-select", "none" );
      this.rd.setStyle( this.ghostDiv, "width", parentRect.width + "px" );
      this.rd.setStyle( this.ghostDiv, "background-color", this.activeColor );
      this.rd.appendChild( this.div, this.ghostDiv );
   }
   createEvents() {
      this.createMousedown();
      this.createMouseenter();
      this.createMouseout();
   }
   createMousedown() {
      this.mousedownListener = this.rd.listen( this.div, "mousedown", () => {
         this.createMouseup();
         this.createMousemove();
         this.createGhostDiv();
      } );
   }
   createMouseup() {
      this.mouseupListener = this.rd.listen( window, "mouseup", ( e: MouseEvent ) => {
         this.x = 0; this.y = 0;
         this.rd.removeChild( this.div, this.ghostDiv );
         this.rd.setStyle( this.div, "background-color", this.defaultColor );

         this.mousemoveListener();
         this.mouseupListener();
      } );
   }
   createMousemove() {
      this.mousemoveListener = this.rd.listen( window, "mousemove", ( e: MouseEvent ) => {
         e.preventDefault();
         if ( e.buttons != 1 ) { this.mousemoveListener(); this.mouseupListener(); }

         this.xPrev = this.x || e.clientX; this.yPrev = this.y || e.clientY;
         this.x = e.clientX; this.y = e.clientY;

         const xdir: number = this.x === this.xPrev ? 0 : this.x > this.xPrev ? 1 : -1;
         if ( xdir === 0 ) return;

         const meRects = this.elementRef.nativeElement.getBoundingClientRect();
         const distance = this.x - this.xPrev;

         if ( this.direction == "right" ) {
            const modifier = 1;
            const newWidth = meRects.width + distance;
            const targetIndex = this.options.index + modifier;

            const target = this.resizeService.resizeElements[ targetIndex ];
            const targetElWidth = target.element.getBoundingClientRect().width;

            // check target min width and exit if reached
            if ( target.minWidth && xdir > 0 && targetElWidth <= target.minWidth ) {
               // console.log( "failed target min width check" );
               return;
            }
            // check self min width and exit if reached
            if ( this.options.minWidth && xdir < 0 && newWidth <= this.options.minWidth ) {
               // console.log( "failed self min width check" );
               return;
            }

            const newSizeSet = this.resizeService.setFractions(
               this.options.index,
               targetIndex,
               newWidth,
               distance,
            );

            if ( !newSizeSet ) return;

            this.rd.setStyle( this.ghostDiv, "left", meRects.right + "px" );
         }
      } );
   }

   createMouseenter() {
      this.mouseenterListener = this.rd.listen( this.div, "mouseenter", ( e: MouseEvent ) => {
         if ( e.buttons >= 1 ) return;
         this.rd.setStyle( this.div, "background-color", this.highlightColor );
      } );
   }
   createMouseout() {
      this.mouseoutListener = this.rd.listen( this.div, "mouseout", () => {
         this.rd.setStyle( this.div, "background-color", this.defaultColor );
      } );
   }

   ngOnDestroy() {
      this.mousedownListener?.();
      this.mousemoveListener?.();
      this.mouseupListener?.();
      this.mouseenterListener?.();
      this.mouseoutListener?.();
   }
}