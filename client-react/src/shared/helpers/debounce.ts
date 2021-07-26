export function debounce( this: any, func: Function, timeout = 300 ) {
   let timer: any;
   return ( ...args: any ) => {
      clearTimeout( timer );
      timer = setTimeout( () => { func.apply( this, args ); }, timeout );
   };
}