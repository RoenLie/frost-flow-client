import { Component } from '@angular/core';
import { InvManagerFlowService } from "@features/inventory/features/manager/services/flow/inv-manager-flow.service";


@Component( {
   selector: 'fl-flow-selector',
   templateUrl: './flow-selector.component.html',
   styleUrls: [ './flow-selector.component.scss' ]
} )
export class FlowSelectorComponent {
   constructor ( public invFlowService: InvManagerFlowService ) { }
}
