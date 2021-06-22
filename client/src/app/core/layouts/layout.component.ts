import { Component, OnInit, ViewChild, ComponentFactoryResolver, Type } from '@angular/core';
import { Router, NavigationStart, RoutesRecognized, NavigationEnd, ResolveEnd } from '@angular/router';
import { LayoutDirective } from "@core/layouts/layout.directive";
import { Layout } from "@core/layouts/layout.service";
import { BehaviorSubject } from "rxjs";


interface ILayout { data: any; }


@Component( {
   selector: "app-layout",
   template: `
      <div class="loader" *ngIf="loading">
         <mat-spinner></mat-spinner>
      </div>
      <ng-template appLayoutHost></ng-template>
   `,
   styles: [ `
      .loader {
         position: fixed;
         display: grid;
         place-items: center;
         height: 100%;
         width: 100%;
         background-color: rgba(0,0,0,0.5);
      }
  ` ]
} )
export class LayoutComponent implements OnInit {
   layout = new BehaviorSubject<Layout>( undefined as any );
   prevLayoutComponent: Type<any>;
   @ViewChild( LayoutDirective, { static: true } ) layoutHost: LayoutDirective;

   loading: boolean = false;

   constructor (
      private cfr: ComponentFactoryResolver,
      private router: Router,
   ) {
      router.events.subscribe( ( event ) => {
         if ( event instanceof NavigationStart ) { }
         if ( event instanceof RoutesRecognized ) { }
         if ( event instanceof ResolveEnd ) {
            const routeData = event.state.root.firstChild?.data;
            this.loadComponent( routeData?.layout );
         }
         if ( event instanceof NavigationEnd ) { }
      } );
   }
   ngOnInit() { }
   loadComponent( layout: Layout ) {
      if ( !layout ) return;
      if ( this.prevLayoutComponent === layout.component ) return;

      const componentFactory =
         this.cfr.resolveComponentFactory( layout.component );

      const viewContainerRef = this.layoutHost.viewContainerRef;
      viewContainerRef.clear();

      const componentRef =
         viewContainerRef.createComponent<ILayout>( componentFactory );

      componentRef.instance.data = layout.data;

      this.prevLayoutComponent = layout.component;
   }
}
