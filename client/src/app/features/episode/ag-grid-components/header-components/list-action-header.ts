import { Component, ElementRef, ViewChild } from '@angular/core';
import { IHeaderAngularComp } from "ag-grid-angular";
import { IHeaderParams } from "ag-grid-community";
import { BehaviorSubject } from "rxjs";


@Component( {
   selector: 'epi-action-header',
   templateUrl: "list-action-header.html",
   styleUrls: [ "list-action-header.scss" ],
} )
export class ActionHeader implements IHeaderAngularComp {
   params: IHeaderParams;
   $checkAll = new BehaviorSubject<boolean>( false );
   width: number = 70;

   @ViewChild( 'menuButton', { read: ElementRef } ) public menuButton: any;

   agInit( params: IHeaderParams ): void {
      this.params = params;

      this.$checkAll.subscribe( val => {
         // console.log( val );
      } );
   }

   onMenuClicked( event: Event ) {
      this.params.showColumnMenu( this.menuButton.nativeElement );
   };

   checkAllClicked( event: Event ) {
      console.log( event );
   }

   refresh = ( params: IHeaderParams ) => false;
}