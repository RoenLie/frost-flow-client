export class StringCompareMap<K, V> extends Map {
   constructor () { super(); }

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
     * loops through the input array and does a stringify compare against existing keys.
     * pops off one entry from the array for each loop to see if the reduced array matches
     * existing keys.
     * returns undefined if no combinations of input array exists as a key.
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
}