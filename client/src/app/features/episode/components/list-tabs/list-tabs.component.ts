import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ListTabsService } from "@features/episode/services/list-tabs/list-tabs.service";
import { BehaviorSubject } from "rxjs";


@Component( {
   selector: "epi-list-tabs",
   templateUrl: "list-tabs.component.html",
   styleUrls: [ "list-tabs.component.scss" ]
} )
export class ListTabsComponent implements OnInit {
   activeTab = new BehaviorSubject<WorkspaceTab | null>( null );

   constructor (
      public listTabs: ListTabsService,
      private route: ActivatedRoute ) { }

   ngOnInit(): void { }

   click( event: MouseEvent, tab: WorkspaceTab ) {
      if ( this.activeTab.value?.sys_id == tab.sys_id ) return;

      this.listTabs.navigateToTab( tab, this.route.parent );
   }

   auxClick( event: MouseEvent, tab: WorkspaceTab ) {
      if ( event.button !== 1 ) return;
      this.close( tab );
   }

   close( tab: WorkspaceTab ) {
      this.listTabs.closeTab( tab );
   }
}


export interface WorkspaceTab {
   sys_id: string,
   sys_created_at: string,
   sys_updated_at: string,
   [ x: string ]: any,
}
