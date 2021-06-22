import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InventoryPortalComponent } from "@features/inventory/features/portal/router/inventory-portal.component";


const routes: Routes = [
   {
      path: "",
      component: InventoryPortalComponent
   },
];


@NgModule( {
   imports: [
      CommonModule,
      RouterModule.forChild( routes ),
   ]
} )
export class InventoryPortalModule { };