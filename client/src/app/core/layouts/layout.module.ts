import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LayoutDirective } from "@core/layouts/layout.directive";
import { LayoutComponent } from "@core/layouts/layout.component";


@NgModule( {
  declarations: [
    LayoutDirective,
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    LayoutComponent,
  ],
  providers: [],
} )
export class LayoutModule { }


