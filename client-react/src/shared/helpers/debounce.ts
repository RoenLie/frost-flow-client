export function debounce( this: any, func: Function, timeout = 300 ) {
   let timer: any;
   return ( ...args: any ) => {
      clearTimeout( timer );
      timer = setTimeout( () => { func.apply( this, args ); }, timeout );
   };
}


export function debounce_leading( this: any, func: Function, timeout = 300 ) {
   let timer: any;
   return ( ...args: any ) => {
      if ( !timer ) {
         func.apply( this, args );
      }
      clearTimeout( timer );
      timer = setTimeout( () => {
         timer = undefined;
      }, timeout );
   };
}