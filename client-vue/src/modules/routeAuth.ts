import { UserModule } from '~/types';


export const install: UserModule = ( { app, isClient, router } ) => {
   if ( !isClient ) return;
   router.beforeEach( () => {
      // console.log( "global before each route auth hook" );
   } );
   router.beforeResolve( () => {
      // console.log( "global before route resolve auth hook" );
   } );
   router.afterEach( () => {
      // console.log( "global after route auth hook" );
   } );
};