import { Component, OnInit } from '@angular/core';
import { ListTabsService } from "@features/episode/services/list-tabs/list-tabs.service";


@Component( {
   selector: "epi-list-tabs-home",
   templateUrl: "list-tabs-home.component.html",
   styleUrls: [ "list-tabs-home.component.scss" ]
} )
export class ListTabsHomeComponent implements OnInit {

   constructor ( public listTabs: ListTabsService ) { }

   ngOnInit(): void {
   }
}
