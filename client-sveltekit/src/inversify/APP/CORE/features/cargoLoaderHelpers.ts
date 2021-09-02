import type { IDeclaration } from "~/inversify/APP/implement";


type GetExplicitDetails = (
   declaration: IDeclaration,
   module: string,
   realm: string
) => { module: string, realm?: string; hierarchy: string[]; dependencies?: string[]; };
export const getExplicitDetails: GetExplicitDetails = ( declaration, module, realm ) => {
   const moduleDefined = declaration.modules[ module ];
   if ( !moduleDefined ) return { module, ...declaration.defaults };

   const defaultsDefined = moduleDefined.defaults;
   const explicitlyDefined = moduleDefined?.explicits.find( m => m.realm == realm );

   const details = explicitlyDefined || defaultsDefined || declaration.defaults;

   return { module, ...details };
};


const test = new Array( 3 );

type MapDependencies = (
   declaration: IDeclaration,
   realm: string,
   deps: string[],
   mapout: StringCompareMap<string, Record<string, unknown>>
) => StringCompareMap<string, { module: string; hierarchy: string[]; dependencies: string[]; }>;
export const mapDependencies: MapDependencies = ( declaration, realm, deps, mapout = new StringCompareMap() ) => {
   deps.forEach( d => {
      const details = getExplicitDetails( declaration, d, realm );

      // this needs to be changed out for a better implementation to check for circular deps
      // if ( mapout.has( d ) )
      //    throw new Error( `Circular dependency on module: '${ d }' for realm: '${ realm }'` );

      mapout.set( d, details );

      if ( !details?.dependencies )
         return;

      mapDependencies( declaration, realm, details.dependencies, mapout );
   } );

   return mapout as StringCompareMap<string, { module: string; hierarchy: string[]; dependencies: string[]; }>;
};

export class StringCompareMap<K, V> extends Map<K, V> {
   constructor ( entries?: readonly ( readonly [ K, V ] )[] | null ) {
      super( entries );
   }

   /**
    * overrides default get behavior to perform a stringify compare.
    * defaults to the base implementation.
    */
   override get( key: K ): V | undefined {
      for ( const iterator of this.entries() ) {
         if ( JSON.stringify( iterator[ 0 ] ) != JSON.stringify( key ) ) continue;
         return iterator[ 1 ];
      }

      return super.get( key );
   }

   /**
    * overrides default get behavior to perform a stringify compare.
    * defaults to the base implementation.
    */
   override has( key: K ): boolean {
      for ( const iterator of this.entries() ) {
         if ( JSON.stringify( iterator[ 0 ] ) != JSON.stringify( key ) ) continue;
         return true;
      }

      return super.has( key );
   }

   /**
     * loops through the input array and does a stringify compare against existing keys.
     * pops off one entry from the array for each loop to see if the reduced array matches
     * existing keys.
     * returns the value if found and undefined if no combinations of input array exists as a key.
    */
   getReduce( key: Array<string> ): V | undefined {
      const checkArr: Array<string> = JSON.parse( JSON.stringify( key ) );
      while ( checkArr.length ) {
         for ( const iterator of this.entries() ) {
            if ( JSON.stringify( iterator[ 0 ] ) != JSON.stringify( checkArr ) ) continue;
            return iterator[ 1 ];
         }

         checkArr.pop();
      }

      return undefined;
   }

   /**
     * loops through the input array and does a stringify compare against existing keys.
     * pops off one entry from the array for each loop to see if the reduced array matches
     * existing keys.
     * returns true if found and false if no combinations of input array exists as a key.
    */
   hasReduce( key: Array<string> ): boolean {
      const checkArr: Array<string> = JSON.parse( JSON.stringify( key ) );
      while ( checkArr.length ) {
         for ( const iterator of this.entries() ) {
            if ( JSON.stringify( iterator[ 0 ] ) != JSON.stringify( checkArr ) ) continue;
            return true;
         }

         checkArr.pop();
      }

      return false;
   }

   reduce<U>( callbackfn: ( accumulator: U, currentValue: [ K, V ] ) => U, initialValue: U ): U {
      for ( const iterator of this.entries() ) {
         callbackfn( initialValue, iterator );
      }

      return initialValue;
   }
}