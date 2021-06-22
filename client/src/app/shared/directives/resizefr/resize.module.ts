import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ResizeHostDirective } from "@shared/directives/resizefr/resize-host.directive";
import { ResizeOptionsDirective } from "@shared/directives/resizefr/resize-options.directive";
import { ResizableDirective } from "@shared/directives/resizefr/resize.directive";


@NgModule( {
   imports: [ CommonModule ],
   declarations: [
      ResizableDirective,
      ResizeHostDirective,
      ResizeOptionsDirective
   ],
   exports: [
      ResizableDirective,
      ResizeHostDirective,
      ResizeOptionsDirective
   ]
} )
export class ResizableFrModule { }