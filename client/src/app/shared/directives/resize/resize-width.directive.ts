import { Directive, ElementRef, Input, OnInit, Renderer2 } from "@angular/core";
import { ResizeService } from "@shared/directives/resize/resize.service";


@Directive( {
   selector: "[resizeWidth]",
} )
export class ResizeWidthDirective implements OnInit {

   @Input( "resizeWidth" ) width: number = 0;
   constructor (
      private resizeService: ResizeService,
      private elementRef: ElementRef<Element>,
      private rd: Renderer2 ) { }

   ngOnInit() {
      this.resizeService.widthElements
         .push( {
            element: this.elementRef.nativeElement,
            width: this.width
         } );
   }
}