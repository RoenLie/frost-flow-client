import { Directive, ElementRef, OnInit, Renderer2 } from "@angular/core";
import { ResizeService } from "@shared/directives/resize/resize.service";


@Directive( {
   selector: "[resizeHost]",
   providers: [ ResizeService ]
} )
export class ResizeHostDirective implements OnInit {
   constructor (
      private resizeService: ResizeService,
      private elementRef: ElementRef<Element>,
      private rd: Renderer2 ) { }

   ngOnInit() {
      this.resizeService.hostRect =
         this.elementRef.nativeElement.getBoundingClientRect();
   }
}