import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ResizeHostDirective } from "@shared/directives/resize/resize-host.directive";
import { ResizeWidthDirective } from "@shared/directives/resize/resize-width.directive";
import { ResizableDirective } from "@shared/directives/resize/resize.directive";


@NgModule( {
   imports: [ CommonModule ],
   declarations: [
      ResizableDirective,
      ResizeHostDirective,
      ResizeWidthDirective
   ],
   exports: [
      ResizableDirective,
      ResizeHostDirective,
      ResizeWidthDirective
   ]
} )
export class ResizableModule { }