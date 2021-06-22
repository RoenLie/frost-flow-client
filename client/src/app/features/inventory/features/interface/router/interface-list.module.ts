import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { InterfaceListView } from "@features/inventory/features/interface/views/list/interface-list.view";
import { AngularSvgIconModule } from "angular-svg-icon";


const routes: Routes = [
   { path: "", component: InterfaceListView },
];


@NgModule( {
   imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forChild( routes ),
      AngularSvgIconModule,
   ],
   declarations: [],
} )
export class InvInterfaceModule { };