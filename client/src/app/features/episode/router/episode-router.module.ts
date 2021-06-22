import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";


const routes: Routes = [
   {
      path: "workspace",
      loadChildren: async () =>
         ( await import( "@features/episode/experiences/workspace/router/workspace-router.module" ) )
            .WorkspaceModule
   },
];


@NgModule( {
   imports: [
      CommonModule,
      RouterModule.forChild( routes ),
   ],
   exports: [ RouterModule ]
} )
export class EpisodeModule { };