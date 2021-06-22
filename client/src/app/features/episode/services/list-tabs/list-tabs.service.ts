import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RecordService } from "@features/episode/services/record/record.service";
import { LocalStorage } from "@shared/utilities/localStorage";
import { BehaviorSubject } from "rxjs";


@Injectable( { providedIn: "root" } )
export class ListTabsService {
   tabs = new BehaviorSubject<WorkspaceTab[]>( [] );
   activeTab = new BehaviorSubject<WorkspaceTab | null>( null );
   relativeTo: ActivatedRoute;

   constructor (
      private router: Router,
      private route: ActivatedRoute,
      private record: RecordService
   ) {
      const tabs = LocalStorage.getItem( "workspaceTabs" );
      const activeTab = LocalStorage.getItem( "activeTab" );

      if ( tabs ) this.tabs.next( tabs );
      if ( activeTab ) this.activeTab.next( activeTab );

      this.tabs.subscribe( ( tabs: WorkspaceTab[] ) => {
         LocalStorage.setItem( "workspaceTabs", tabs );
      } );

      this.activeTab.subscribe( ( tab: WorkspaceTab | null ) => {
         LocalStorage.setItem( "activeTab", tab );

         record.tableAndId = {
            table: "olympic_winners",
            id: tab?.sys_id || ""
         };
      } );
   }

   goHome() {
      console.log( "ListTabsService:", "goHome" );

      if ( !this.relativeTo ) {
         this.activeTab.next( null );

         this.router.navigate(
            [ `episode/workspace/list` ],
            { relativeTo: this.route }
         );

         return;
      }

      this.activeTab.next( null );
      this.router.navigate(
         [ `list` ],
         {
            relativeTo: this.relativeTo,
            queryParams: {
               activeSysId: null
            }
         }
      );
   }

   closeTab( tab: WorkspaceTab ) {
      // find ID key.
      const idKey = Object.keys( tab ).find( t => t.includes( "id" ) );

      // exit if there is no id key.
      if ( !idKey ) return;

      // find the tab index to remove.
      const tabIndex = this.tabs.value.findIndex( t => t[ idKey ] === tab[ idKey ] );

      // remove the tab from the list.
      const arr = this.tabs.value;
      arr.splice( tabIndex, 1 );
      this.tabs.next( arr );

      // if there is no active value, go home.
      if ( !this.activeTab.value ) {
         this.goHome();
         return;
      }

      // activate tab and navigate to it.
      this.activeTab.next( this.tabs.value[ this.tabs.value.length - 1 ] );
      this.navigateToTab( this.activeTab.value, this.relativeTo );
   }

   openTab( tab: WorkspaceTab ) {
      // find ID key.
      const idKey = Object.keys( tab ).find( t => t.includes( "id" ) );

      // can't find any id key, just push the tab in and exit.
      if ( !idKey ) return this.tabs.next( [ ...this.tabs.value, tab ] );

      // check if exists already by using idKey
      const exists = this.tabs.value?.some( t => t[ idKey ] === tab[ idKey ] );
      if ( exists ) return;

      this.tabs.next( [ ...this.tabs.value, tab ] );
   }

   navigateToTab( tab: WorkspaceTab | null, relativeTo: ActivatedRoute | null ) {
      if ( !tab || !relativeTo ) return;

      this.relativeTo = relativeTo;
      this.activeTab.next( tab );
      this.router.navigate(
         [ `record` ],
         {
            relativeTo,
            queryParams: {
               sysId: tab.sys_id,
            }
         }
      );
   }
}


export interface WorkspaceTab {
   sys_id: string,
   sys_created_at: string,
   sys_updated_at: string,
   [ x: string ]: any,
}
