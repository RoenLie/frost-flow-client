import { environment } from "@/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";
import { BehaviorSubject, Subscription } from "rxjs";
import { filter } from "rxjs/operators";


@Injectable( { providedIn: 'root' } )
export class ViewEditorService {
   // viewUrl: string = "http://localhost:8025/postgres/view";
   viewUrl: string = `${ environment.serverIp }/postgres/view`;
   tables: string[] = [ "olympic_winners" ];
   activeTable = new BehaviorSubject<String>( this.tables[ 0 ] );
   views: View[] = [];
   activeView = new BehaviorSubject<View>( this.views[ 0 ] );

   routerEventsSub: Subscription;

   subscriptions: Subscription[] = [];

   constructor ( private http: HttpClient, private router: Router ) {

   }

   subscribe() {
      if ( this.activeView.getValue() ) {
         const view = this.activeView.getValue();
         const urlTree = this.router.parseUrl( this.router.url );
         const newUrlParams = urlTree.queryParams;
         newUrlParams.view = view.name;

         urlTree.queryParams = {};
         this.router.navigate( [ urlTree.toString() ], { queryParams: newUrlParams } );
      }


      this.subscriptions.push( this.router.events.pipe( filter( event => ( event instanceof NavigationEnd ) ) ).subscribe( event => {
         const urlTree = this.router.parseUrl( this.router.url );

         const newUrlParams = urlTree.queryParams;
         urlTree.queryParams = {};
         const viewName = urlTree.queryParams.view;

         if ( !viewName && this.activeView.getValue() ) {
            newUrlParams.view = this.activeView.getValue().name;
            this.router.navigate( [ urlTree.toString() ], { queryParams: newUrlParams } );
         }
      } ) );


      this.subscriptions.push( this.activeView.subscribe( view => {
         const urlTree = this.router.parseUrl( this.router.url );
         const newUrlParams = urlTree.queryParams;
         newUrlParams.view = view?.name ? view.name : newUrlParams.view;

         urlTree.queryParams = {};
         this.router.navigate( [ urlTree.toString() ], { queryParams: newUrlParams } );
      } ) );


      this.subscriptions.push( this.getView().subscribe( ( view ) => {
         this.views = view.data;
         const urlTree = this.router.parseUrl( this.router.url );

         const viewName = urlTree.queryParams.view;
         if ( viewName ) {
            const existingViewIndex = this.views.findIndex( x => x.name == viewName );
            if ( existingViewIndex > -1 ) this.activeView.next( this.views[ existingViewIndex ] );
         } else if ( !this.activeView.getValue() ) {
            this.activeView.next( this.views[ 0 ] );
         }
      } ) );
   }

   unsubscribe() {
      this.subscriptions.forEach( x => x.unsubscribe() );
      this.subscriptions = [];
   }

   getView = () => this.http.get<PostgresResult<View>>( this.viewUrl );

   setActiveView( index: number ) {
      this.activeView.next( this.views[ index ] );
   }
}


export type PostgresResult<T> = { data: T[], columns: any[]; };

export interface View {
   name: string;
   sys_id: string;
   table_name: string;
   view_type: string;
}
