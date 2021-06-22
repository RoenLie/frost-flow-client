import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InventoryOptionsComponent } from "@features/inventory/features/options/router/inventory-options.component";


const routes: Routes = [
   {
      path: "",
      component: InventoryOptionsComponent
   },
];


@NgModule( {
   imports: [
      CommonModule,
      RouterModule.forChild( routes ),
   ]
} )
export class InventoryOptionsModule { };