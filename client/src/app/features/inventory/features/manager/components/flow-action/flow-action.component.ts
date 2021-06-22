import { Component, Input, OnInit } from '@angular/core';


@Component( {
   selector: 'fl-flow-action',
   templateUrl: 'flow-action.component.html',
   styleUrls: [ 'flow-action.component.scss' ]
} )
export class FlowActionComponent implements OnInit {
   @Input() svgPath: string;
   @Input() svgStyle: any;
   constructor () { }
   ngOnInit() { }
}
