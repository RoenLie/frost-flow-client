import { Component, HostListener, OnInit, ElementRef } from '@angular/core';
import { DefaultLayoutService } from "@core/layouts/default/default.service";
import { BrandService } from "@core/services/brand.service";
import { Menu, MenuService } from "@core/services/menu.service";


@Component( {
  selector: 'app-nav-left',
  templateUrl: 'nav-left.component.html',
  styleUrls: [ 'nav-left.component.scss' ]
} )
export class NavLeftComponent implements OnInit {
  nativeElement: Element;
  navTitle: string = "";
  menu: Menu;

  constructor (
    public defaultLayoutService: DefaultLayoutService,
    public brandService: BrandService,
    public menuService: MenuService,
    private elementRef: ElementRef<Element>
  ) {
    this.menu = this.menuService.menu;
    this.nativeElement = this.elementRef.nativeElement;
  }

  ngOnInit(): void { }

  @HostListener( "window:touchstart", [ "$event" ] )
  @HostListener( "window:mousedown", [ "$event" ] )
  onClick( event: Event ) {
    const target = event.target as Element;

    const path = event.composedPath() as Element[];

    const validClick = path.some( ( el: Element ) => !!( el == this.nativeElement ) );

    if ( !validClick ) this.defaultLayoutService.navigationLeftOpen = false;
  }

}
