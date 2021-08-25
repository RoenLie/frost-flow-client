import { Container } from "inversify";

export function getContainer( modules: string[] ) {
   const availableContainers = import.meta.globEager( '/src/inversify/APP/**/*.container.*' );

   const filteredContainers = Object
      .entries( availableContainers )
      .filter( ( [ k, v ] ) => modules.some( m => k.split( '/' ).slice( -1 )[ 0 ].includes( m ) ) );

   const map = new Map( filteredContainers );
   console.log( map );

}



// const correctContainer = import.meta.globEager( '/src/inversify/APP/**/*.container.*' );
// console.log( correctContainer );

// Object.values( correctContainer ).forEach( c => {
//    const container = c.container as Container;
//    console.log( container );
// } );