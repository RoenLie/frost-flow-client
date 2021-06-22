import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrbThreeComponent } from "@features/entry/components/orb/orb.three.component";
import { EntryViewComponent } from "@features/entry/router/entry.component";



@NgModule( {
  declarations: [ EntryViewComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild( [
      { path: "", component: OrbThreeComponent },
    ] ),
  ]
} )
export class EntryModule { }
