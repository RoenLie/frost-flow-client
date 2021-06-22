import { CommonModule } from "@angular/common";
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { FormControlErrorPipe } from "@shared/components/fl-input/control-error.pipe";
import { FlInputComponent } from "@shared/components/fl-input/fl-input.component";


@NgModule( {
  imports: [ CommonModule, FormsModule ],
  declarations: [ FlInputComponent, FormControlErrorPipe ],
  exports: [ FlInputComponent ]
} )
export class FlInputModule { }
