import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fadeAnimation, toggleLeft, toggleRight } from "./animations";
import { nagivationMenu } from "@core/config/navigationMenu";
import { DefaultLayoutService } from "@core/layouts/default/default.service";
import { MenuService } from "@core/services/menu.service";


@Component( {
   selector: "layout-default",
   templateUrl: "default.component.html",
   styleUrls: [ "default.component.scss" ],
   encapsulation: ViewEncapsulation.None,
   animations: [
      toggleLeft,
      toggleRight,
      fadeAnimation,
      // slideInAnimation
   ]
} )
export class DefaultComponent implements OnInit {
   data: any;
   constructor (
      public defaultLayoutService: DefaultLayoutService,
      private menuService: MenuService ) { }

   ngOnInit(): void {
      nagivationMenu.forEach( ( menu ) => this.menuService.add( menu ) );
   }

   routeAnimation = ( outlet: RouterOutlet ) => {
      let animation = outlet?.activatedRouteData?.animation;

      // if ( animation === undefined ) {
      //    animation = outlet.activatedRoute.routeConfig?.component?.name;
      // }

      return animation || undefined;
   };
}


// ----------------------------------------------------------------------------


import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MenuComponent } from "@core/layouts/default/nav-left/menu/menu.component";
import { NavLeftComponent } from "@core/layouts/default/nav-left/nav-left.component";
import { NavRightComponent } from "@core/layouts/default/nav-right/nav-right.component";
import { CenterComponent } from "@core/layouts/default/nav-top/center/center.component";
import { LeftComponent } from "@core/layouts/default/nav-top/left/left.component";
import { NavTopComponent } from "@core/layouts/default/nav-top/nav-top.component";
import { RightComponent } from "@core/layouts/default/nav-top/right/right.component";
import { AngularSvgIconModule } from "angular-svg-icon";


@NgModule( {
   imports: [
      CommonModule,
      RouterModule,
      AngularSvgIconModule
   ],
   declarations: [
      DefaultComponent,
      NavRightComponent,
      NavLeftComponent,
      NavTopComponent,
      LeftComponent,
      CenterComponent,
      RightComponent,
      MenuComponent
   ],
   exports: [ DefaultComponent ]
} )
export class DefaultLayoutModule { };
