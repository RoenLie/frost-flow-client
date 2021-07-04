import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";


@Component( {
   selector: "epi-side-nav",
   templateUrl: "side-nav.component.html",
   styleUrls: [ "side-nav.component.scss" ]
} )
export class SideNavComponent implements OnInit {

   navigation = [
      {
         svgPath: "assets/svg/home-solid.svg",
         svgStyle: {
            'height.rem': "1.5",
            'width.rem': "1.5",
            'display': 'grid',
            'place-items': 'center',
            'cursor': 'pointer'
         },
         route: "episode/workspace/dashboard"
      },
      {
         svgPath: "assets/svg/list-solid.svg",
         svgStyle: {
            'height.rem': "1.5",
            'width.rem': "1.5",
            'display': 'grid',
            'place-items': 'center',
            'cursor': 'pointer'
         },
         route: "episode/workspace/list"
      },
      {
         svgPath: "assets/svg/eye-regular.svg",
         svgStyle: {
            'height.rem': "1.5",
            'width.rem': "1.5",
            'display': 'grid',
            'place-items': 'center',
            'cursor': 'pointer'
         },
         route: "episode/workspace/view_editor"
      }
   ];

   constructor ( private router: Router ) { }

   ngOnInit(): void { }

   navigateToRoute( { route, routeParams, routeQuery }: RouteNavigation, index: number ) {
      if ( route === undefined ) return;

      const urlTree = this.router.parseUrl( route );
      urlTree.queryParams = {};
      const pureRoute = urlTree.toString();

      console.log( pureRoute );



      if ( route === "" ) {
         this.router.navigate( [ pureRoute ] );
      } else {
         this.router.navigate( [ pureRoute, routeParams || {} ],
            { queryParams: routeQuery } );
      }
   }
}

interface RouteNavigation {
   [ key: string ]: any;
   route?: string,
   routeParams?: any,
   routeQuery?: any,
}