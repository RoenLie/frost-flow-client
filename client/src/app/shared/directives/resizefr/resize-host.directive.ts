import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from "@angular/core";
import { ResizeService } from "@shared/directives/resizefr/resize.service";


interface ResizeHostOptions {
   templateColumns: string;
}


@Directive( {
   selector: "[resizeHost]",
   providers: [ ResizeService ]
} )
export class ResizeHostDirective implements OnInit {
   @Input( "resizeHost" ) options: ResizeHostOptions;
   constructor (
      private resizeService: ResizeService,
      private elementRef: ElementRef<Element>,
      private rd: Renderer2 ) { }

   ngOnInit() {
      this.resizeService.hostEl = this.elementRef.nativeElement;
      this.resizeService.hostRect = this.elementRef.nativeElement.getBoundingClientRect();

      this.resizeService.fractions.subscribe( ( val ) => {
         this.rd.setStyle(
            this.elementRef.nativeElement,
            "grid-template-columns",
            val.map( v => `${ v / 100 }fr` ).join( " " )
         );
      } );

      this.resizeService.resetFractions();
   }

   @HostListener( "window:resize", [ "$event" ] )
   hostResize( e: Event ) {
      this.resizeService.resetFractions();
   }
}