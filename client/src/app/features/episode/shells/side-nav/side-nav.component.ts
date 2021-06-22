import { Component, OnInit } from '@angular/core';

@Component( {
   selector: "epi-side-nav",
   templateUrl: "./side-nav.component.html",
   styleUrls: [ "./side-nav.component.scss" ]
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
         }
      },
      {
         svgPath: "assets/svg/list-solid.svg",
         svgStyle: {
            'height.rem': "1.5",
            'width.rem': "1.5",
            'display': 'grid',
            'place-items': 'center',
            'cursor': 'pointer'
         }
      }
   ];

   constructor () { }

   ngOnInit(): void {
   }

}
