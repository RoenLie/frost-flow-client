import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";


const routes: Routes = [
   { path: "", redirectTo: "portal" },
   {
      path: "portal",
      loadChildren: async () =>
         ( await import( "@features/inventory/features/portal/router/inventory-portal.module" ) )
            .InventoryPortalModule
   },
   {
      path: "manager",
      loadChildren: async () =>
         ( await import( "@features/inventory/features/manager/router/inventory-manager.module" ) )
            .InventoryManagerModule
   },
   {
      path: "interface",
      loadChildren: async () =>
         ( await import( "@features/inventory/features/interface/router/interface-list.module" ) )
            .InvInterfaceModule
   },
   {
      path: "options",
      loadChildren: async () =>
         ( await import( "@features/inventory/features/options/router/inventory-options.module" ) )
            .InventoryOptionsModule
   },
];


@NgModule( {
   imports: [
      CommonModule,
      RouterModule.forChild( routes ),
   ],
   exports: [ RouterModule ]
} )
export class InventoryModule { };