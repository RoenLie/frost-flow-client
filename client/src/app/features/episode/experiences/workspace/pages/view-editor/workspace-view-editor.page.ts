import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ViewEditorService } from "@features/episode/services/view-editor/view-editor.service";


@Component( {
   selector: "epi-workspace-view-editor",
   templateUrl: "workspace-view-editor.page.html",
   styleUrls: [ "workspace-view-editor.page.scss" ]
} )
export class WorkspaceViewEditorPage implements OnInit, OnDestroy {
   constructor ( public viewEditorService: ViewEditorService, private router: Router ) { }

   ngOnInit(): void {
      this.viewEditorService.subscribe();
   }

   ngOnDestroy() {
      this.viewEditorService.unsubscribe();
   }
}
