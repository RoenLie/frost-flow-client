import { Component, OnInit } from '@angular/core';
import { DefaultLayoutService } from "@core/layouts/default/default.service";
import { BrandService } from "@core/services/brand.service";


@Component( {
  selector: 'app-nav-top-left',
  templateUrl: './left.component.html',
  styleUrls: [ './left.component.scss' ]
} )
export class LeftComponent implements OnInit {
  constructor (
    public defaultLayoutService: DefaultLayoutService,
    public brandService: BrandService ) { }
  ngOnInit() { }
}
