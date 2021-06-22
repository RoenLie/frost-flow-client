import { Component, OnInit } from '@angular/core';
import { InvManagerSubflowService } from "@features/inventory/features/manager/services/subflow/inv-manager-subflow.service";


@Component( {
   selector: 'fl-subflow-selector',
   templateUrl: 'subflow-selector.component.html',
   styleUrls: [ 'subflow-selector.component.scss' ]
} )
export class SubflowSelectorComponent implements OnInit {
   svgStyle: any = { 'height.px': '35', 'width.px': '35' };
   constructor ( public subflowService: InvManagerSubflowService ) { }
   ngOnInit() { }
}
