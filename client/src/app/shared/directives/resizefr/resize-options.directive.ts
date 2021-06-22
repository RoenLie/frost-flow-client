import { Directive, ElementRef, Input, OnInit, Renderer2 } from "@angular/core";
import { ResizeService } from "@shared/directives/resizefr/resize.service";


export interface ResizeOptions {
   index: number;
   maxWidth?: number;
   minWidth?: number;
}


@Directive( {
   selector: "[resizeOptions]",
} )
export class ResizeOptionsDirective implements OnInit {

   @Input( "resizeOptions" ) options: ResizeOptions;
   constructor (
      private resizeService: ResizeService,
      private elementRef: ElementRef<Element>,
      private rd: Renderer2 ) { }

   ngOnInit() {
      this.resizeService.resizeElements
         .push( {
            element: this.elementRef.nativeElement,
            index: this.options.index,
            maxWidth: this.options.maxWidth,
            minWidth: this.options.minWidth
         } );
   }
}