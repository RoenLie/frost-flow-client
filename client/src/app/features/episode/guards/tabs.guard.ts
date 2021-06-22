import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { ListTabsService } from "@features/episode/services/list-tabs/list-tabs.service";
import { LocalStorage } from "@shared/utilities/localStorage";


@Injectable( { providedIn: 'root' } )
export class TabsGuard implements CanActivate {
   constructor (
      private router: Router,
      private route: ActivatedRoute,
      private listTabs: ListTabsService
   ) { }

   canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
   ) {
      // if ( !this.listTabs.tabs.value && tabs ) {
      //    this.listTabs.tabs.next( tabs );
      //    this.listTabs.activeTab.next( activeTab );
      // }

      // const url = state.url.split( "?" )[ 0 ];

      // const current = route.params?.domain;
      // const valid = this.domainService.available;

      // if ( current && !valid.includes( current ) ) {
      //    this.domainService.active = valid[ 0 ];
      //    const urlTree = this.router.createUrlTree(
      //       [ url.replace( current, valid[ 0 ] ) ],
      //       {
      //          queryParams: { workflow: route.queryParams?.workflow },
      //          queryParamsHandling: "merge",
      //          preserveFragment: true
      //       }
      //    );

      //    return urlTree;
      // }

      // this.domainService.active = current;
      return true;
   }
}