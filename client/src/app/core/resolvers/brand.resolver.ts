import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { BrandService } from "@core/services/brand.service";


@Injectable( { providedIn: "root" } )
export class BrandResolverService implements Resolve<any> {
   constructor ( private brandService: BrandService ) { }
   resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) {
      const { navTitle, logoPath } = route.data?.brand;
      this.brandService.navTitle = navTitle;
      this.brandService.logoPath = logoPath;
   }
}