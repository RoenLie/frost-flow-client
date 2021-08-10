export { };

Object.defineProperty( Object.prototype, 'isEmpty', {
   value: function ( object: any ) {
      return JSON.stringify( object ) === '{}' || !object;
   },
   writable: false,
   configurable: false,
   enumerable: false
} );

Object.defineProperty( Object.prototype, 'jsonCopy', {
   value: function <T>( object: T ) {
      if ( !object ) return null;
      return JSON.parse( JSON.stringify( object ) );
   },
   writable: false,
   configurable: false,
   enumerable: false
} );