import { Component, OnInit } from '@angular/core';
import { InvManagerFlowActionsService } from "@features/inventory/features/manager/services/flow-actions/inv-manager-flow-actions.service";


@Component( {
   selector: "fl-flow-action-selector",
   templateUrl: "flow-action-selector.component.html",
   styleUrls: [ "flow-action-selector.component.scss" ]
} )
export class FlowActionSelectorComponent implements OnInit {
   svgStyle: any = { 'height.px': '35', 'width.px': '35' };
   constructor ( public flowActionService: InvManagerFlowActionsService ) { }
   ngOnInit() { }
}
