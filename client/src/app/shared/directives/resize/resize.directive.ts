import { AfterViewInit, Directive, ElementRef, Input, OnDestroy, Renderer2 } from "@angular/core";
import { ResizeService } from "@shared/directives/resize/resize.service";


type direction = "top" | "bottom" | "left" | "right";


@Directive( { selector: "[resizable]" } )
export class ResizableDirective implements AfterViewInit, OnDestroy {
   @Input( "resizable" ) direction: direction;
   @Input() defaultColor: string = "inherit";
   @Input() highlightColor: string = "rgba(150,150,150)";
   @Input() activeColor: string = "rgba(200,200,200)";
   @Input() dynamicResize: boolean = false;
   div: HTMLDivElement;
   ghostDiv: HTMLDivElement;
   mousedownListener: Function;
   mousemoveListener: Function;
   mouseupListener: Function;
   mouseenterListener: Function;
   mouseoutListener: Function;

   selfIndex: number = 0;
   rects: DOMRect[];
   elCount: number;
   minX: number;
   maxX: number;
   newWidth: number;
   leftElIndex: number | null;
   rightElIndex: number | null;

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
      const divRect = this.div.getBoundingClientRect();

      this.ghostDiv = this.rd.createElement( "div" );
      this.rd.setStyle( this.ghostDiv, "position", "fixed" );
      this.rd.setStyle( this.ghostDiv, "height", divRect.height + "px" );
      this.rd.setStyle( this.ghostDiv, "user-select", "none" );
      this.rd.setStyle( this.ghostDiv, "width", divRect.width + "px" );
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
         this.rects = [];
         this.resizeService.widthElements.forEach( ( widthEl, index ) => {
            this.rects.push( widthEl.element.getBoundingClientRect() );
            if ( widthEl.element === this.elementRef.nativeElement ) this.selfIndex = index;
         } );

         this.elCount = this.resizeService.widthElements.length;
         this.leftElIndex = this.selfIndex - 1 >= 0 ? this.selfIndex - 1 : null;
         this.rightElIndex = this.selfIndex + 1 <= this.elCount - 1 ? this.selfIndex + 1 : null;

         switch ( this.direction ) {
            case "left": {
               if ( this.leftElIndex === null ) return;
               const minXboundingEl = this.rects[ this.leftElIndex ].left;
               const minWidthBoundingEl = this.resizeService.widthElements[ this.leftElIndex ].width;
               this.minX = minXboundingEl + minWidthBoundingEl;

               const maxXself = this.rects[ this.selfIndex ].right;
               const minWidthSelf = this.resizeService.widthElements[ this.selfIndex ].width;
               this.maxX = maxXself - minWidthSelf;
               break;
            }
            case "right": {
               if ( this.rightElIndex === null ) return;
               const minXself = this.rects[ this.selfIndex ].left;
               const minWidthSelf = this.resizeService.widthElements[ this.selfIndex ].width;
               this.minX = minXself + minWidthSelf;

               const maxXboundingEl = this.rects[ this.rightElIndex ].right;
               const minWidthBoundingEl = this.resizeService.widthElements[ this.rightElIndex ].width;
               this.maxX = maxXboundingEl - minWidthBoundingEl;
               break;
            }
         }

         this.createMouseup();
         this.createMousemove();
         this.createGhostDiv();
      } );
   }
   createMouseup() {
      this.mouseupListener = this.rd.listen( window, "mouseup", ( e: MouseEvent ) => {
         this.rd.removeChild( this.div, this.ghostDiv );
         this.rd.setStyle( this.div, "background-color", this.defaultColor );

         const mouseX = e.clientX;
         const mouseY = e.clientY;
         const hostRect = this.elementRef.nativeElement.getBoundingClientRect();

         switch ( this.direction ) {
            case "left":
               this.rd.setStyle( this.elementRef.nativeElement, "width", this.newWidth + "px" );
               break;
            case "right":
               this.rd.setStyle( this.elementRef.nativeElement, "width", this.newWidth + "px" );
               break;
            default: {
               const newHeight = hostRect.bottom - mouseY;
               this.rd.setStyle( this.elementRef.nativeElement, "height", newHeight + "px" );
            }
         }

         this.mousemoveListener();
         this.mouseupListener();
      } );
   }
   createMousemove() {
      this.mousemoveListener = this.rd.listen( window, "mousemove", ( e: MouseEvent ) => {
         e.preventDefault();
         if ( e.buttons != 1 ) { this.mousemoveListener(); this.mouseupListener(); }

         let x = e.clientX;
         let y = e.clientY;

         const validateX = () => {
            // validate X against minimum x limit.
            x = x >= this.minX ? x : this.minX;
            // validate X against maximum x limit.
            x = x <= this.maxX ? x : this.maxX;
         };

         switch ( this.direction ) {
            case "left": {
               validateX();

               this.newWidth = this.rects[ this.selfIndex ].right - x;
               this.rd.setStyle( this.ghostDiv, "left", x + "px" );

               if ( this.dynamicResize )
                  this.rd.setStyle(
                     this.elementRef.nativeElement, "width", this.newWidth + "px" );
               break;
            }
            case "right": {
               validateX();

               this.newWidth = x - this.rects[ this.selfIndex ].left;
               this.rd.setStyle( this.ghostDiv, "left", x + "px" );

               if ( this.dynamicResize )
                  this.rd.setStyle(
                     this.elementRef.nativeElement, "width", this.newWidth + "px" );
               break;
            }
            default: {
               const dir = "top";
               this.rd.setStyle( this.ghostDiv, dir, e.clientY + "px" );
            }
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