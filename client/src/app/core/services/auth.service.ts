import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from "src/environments/environment";


@Injectable( { providedIn: 'root' } )
export class AuthService {
   user: any;
   isLoggedIn = new BehaviorSubject<boolean>( false );

   constructor () { this.authenticate(); }

   async login() {
      try {
         this.isLoggedIn.next( true );
      } catch ( error ) {
         console.error( error );
         this.isLoggedIn.next( false );
      }
   }
   async logout() {
      try {
         this.isLoggedIn.next( false );
      } catch ( error ) {
         console.error( error );
      }
   }

   async authenticate() {
      const authentication = new Promise( ( resolve, reject ) => {
         // firebase.auth().onAuthStateChanged( u => {
         //   this.user = u;
         //   if ( u ) resolve( u.uid );
         //   else reject( "not logged in" );
         // } );
      } );

      try {
         await authentication;
         this.isLoggedIn.next( true );
      } catch ( error ) {
         console.error( error );
         this.isLoggedIn.next( false );
      }

      return this.isLoggedIn.value;
   }
}