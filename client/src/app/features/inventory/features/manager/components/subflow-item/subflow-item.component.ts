import { Component, Input, OnInit } from '@angular/core';

@Component( {
   selector: 'fl-subflow-item',
   templateUrl: 'subflow-item.component.html',
   styleUrls: [ 'subflow-item.component.scss' ]
} )
export class SubflowItemComponent implements OnInit {
   @Input() svgPath: string;
   @Input() svgStyle: any;
   constructor () { }
   ngOnInit() { }
}
