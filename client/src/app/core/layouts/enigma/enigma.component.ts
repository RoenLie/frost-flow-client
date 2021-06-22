import { Component, OnInit } from '@angular/core';


@Component( {
  selector: 'layout-enigma',
  templateUrl: './enigma.component.html',
  styleUrls: [ './enigma.component.scss' ]
} )
export class EnigmaComponent implements OnInit {
  constructor () { }
  ngOnInit() { }
}

// ----------------------------------------------------------------------------

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AngularSvgIconModule } from "angular-svg-icon";


@NgModule( {
  imports: [
    CommonModule,
    RouterModule,
    AngularSvgIconModule
  ],
  declarations: [
    EnigmaComponent
  ],
  exports: [ EnigmaComponent ]
} )
export class EnigmaLayoutModule { };