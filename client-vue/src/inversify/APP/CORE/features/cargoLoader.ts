import { Container } from "inversify";
import implement from "~/inversify/APP/implement";

/* builds up the container parent child structure and loads the correct modules */
export const cargoLoader = ( module: string, domain: string, ) => {
   const moduleData = implement?.modules?.[ module ]?.find( m => m.domain == domain );
   if ( !moduleData ) {
      console.warn( `Module data for the combination:`
         + ` module ${ module } and domain ${ domain }`
         + ` could not be resolved`
         + ` defaulting to hierarchy: ${ implement?.defaults?.hierarchy }` );
   }

   const hierarchy = moduleData ? moduleData.hierarchy : implement?.defaults?.hierarchy;

   if ( !hierarchy )
      throw new Error( "No module hierarchy could be resolved, error is probably in the implement.ts file" );

   const importedContainers = import.meta.globEager( `../../**/*.container.*` );

   if ( JSON.stringify( importedContainers ) == '{}' )
      throw new Error( 'No containers found' );

   const moduleHierarchy = Object.entries( importedContainers )
      .reduce( ( acc, cur ) => {
         const moduleIdentifier = cur[ 0 ].split( '/' ).slice( -1 )[ 0 ].split( '.' )[ 0 ];

         if ( !hierarchy.includes( moduleIdentifier ) ) return acc;
         acc.push( [ moduleIdentifier, cur[ 1 ].container, cur[ 1 ].loader, cur[ 1 ].unload ] );

         return acc;
      }, [] as Array<[ string, Container, Function, Function ]> )
      .sort( ( a, b ) => {
         const index1 = hierarchy.indexOf( a[ 0 ] );
         const index2 = hierarchy.indexOf( b[ 0 ] );
         return index1 - index2;
      } );

   moduleHierarchy.forEach( ( m, i ) => {
      if ( m[ 0 ] != hierarchy[ hierarchy.length - 1 ] )
         m[ 1 ].parent = moduleHierarchy[ i + 1 ][ 1 ];
      // console.log( 'setting parent value of ', m[ 0 ], 'to', moduleHierarchy[ i + 1 ][ 0 ] );

      m[ 3 ]();
      m[ 2 ]();
   } );


   return moduleHierarchy[ 0 ][ 1 ];
};