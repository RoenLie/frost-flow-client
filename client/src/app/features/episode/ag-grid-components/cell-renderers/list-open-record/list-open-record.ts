import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ListTabsService } from "@features/episode/services/list-tabs/list-tabs.service";
import { AgRendererComponent } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";


@Component( {
   selector: 'total-value-component',
   template: `
      <svg-icon
         class="hover-icon"
         (click)="previewRecord()"
         src="assets/svg/eye-regular.svg"
         [svgStyle]="{
            'height.em':'1.2',
            'width.em':'1.2',
            'display': 'grid',
            'place-items': 'center',
            'cursor': 'pointer'
         }">
      </svg-icon>
      <svg-icon
         class="hover-icon"
         (click)="openRecord()"
         src="assets/svg/box-open-solid.svg"
         [svgStyle]="{
            'height.em':'1.2',
            'width.em':'1.2',
            'display': 'grid',
            'place-items': 'center',
            'cursor': 'pointer'
         }">
      </svg-icon>
   `,
   styleUrls: [ "list-open-record.scss" ]
} )
export class OpenRecordRenderer implements AgRendererComponent {
   cellValue: string;
   rowParams: any;

   constructor ( private listTabs: ListTabsService, private route: ActivatedRoute ) { }

   // gets called once before the renderer is used
   agInit( params: ICellRendererParams ): void {
      this.rowParams = params;
   }

   // gets called whenever the user gets the cell to refresh
   refresh( params: ICellRendererParams ): boolean {
      return false;
   }

   previewRecord() {
      console.log( "OpenRecordRenderer:", "previewRecord" );
   }

   openRecord() {
      console.log( "OpenRecordRenderer:", "openRecord" );
      this.listTabs.openTab( this.rowParams.data );
      this.listTabs.navigateToTab( this.rowParams.data, this.route.parent );
   }

   getValueToDisplay( params: ICellRendererParams ) { }
}