import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules, NoPreloading } from '@angular/router';
import { BrandResolverService } from "@core/resolvers/brand.resolver";
import { LayoutResolverService } from "@core/resolvers/layout.resolver";
import { InventoryManagerGridComponent } from "@features/inventory/features/manager/views/grid/inv-mng-grid.component";


const routes: Routes = [
   { path: "", pathMatch: "full", redirectTo: "entry" },
   {
      path: "entry", loadChildren: async () => (
         await import( "@features/entry/router/entry.module" ) ).EntryModule,
      data: {
         brand: {
            navTitle: "Flow",
            logoPath: "assets/svg/frostbite_logo.svg"
         }
      },
      resolve: {
         layout: LayoutResolverService,
         brand: BrandResolverService
      },
   },
   {
      path: "episode", loadChildren: async () =>
         ( await import( "@features/episode/router/episode-router.module" ) ).EpisodeModule,
      data: {
         brand: {
            navTitle: "Flow",
            logoPath: "assets/svg/frostbite_logo.svg"
         }
      },
      resolve: {
         layout: LayoutResolverService,
         brand: BrandResolverService
      },
   },
   {
      path: "inv", loadChildren: async () => (
         await import( "@features/inventory/router/inventory.module" ) ).InventoryModule,
      data: {
         brand: {
            navTitle: "Flow",
            logoPath: "assets/svg/frostbite_logo.svg"
         }
      },
      resolve: {
         layout: LayoutResolverService,
         brand: BrandResolverService
      },
   },
   {
      path: "404", loadChildren: async () => (
         await import( "@features/error404/error404.module" ) ).Error404Module,
      data: { layout: "enigma" },
      resolve: {
         layout: LayoutResolverService,
      },
   },
   { path: "**", redirectTo: "404" }
];


@NgModule( {
   imports: [ RouterModule.forRoot( routes, {
      useHash: true,
      // preloadingStrategy: NoPreloading
      preloadingStrategy: PreloadAllModules
   } ) ],
   exports: [ RouterModule ]
} )
export class AppRoutingModule { }
