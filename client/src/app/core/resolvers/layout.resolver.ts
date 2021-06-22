import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { LayoutService } from "@core/layouts/layout.service";


@Injectable( { providedIn: "root" } )
export class LayoutResolverService implements Resolve<any> {
   constructor ( private layoutService: LayoutService ) { }
   async resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) {
      const layout = await this.layoutService.getLayout( route.data.layout );
      return layout;
   }
}