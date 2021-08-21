import { readFileSync } from "fs";
import MagicString from 'magic-string';
import VueCompiler from "@vue/compiler-sfc";


interface eyeshareOptions {
   invoice?: {
      overridable: boolean;
   };
}


const vueEyesharePlugin = {
   name: 'vue-eyeshare',
   transform( code: string, id: string ) {
      // console.log( id );
      if ( !/vue&type=eyeshare/.test( id ) ) return;

      if ( /\.ya?ml$/.test( id ) ) {
         code = JSON.stringify(
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            require( 'js-yaml' ).safeLoad( code.trim() )
         );
      }

      const objCode = JSON.parse( code ) as eyeshareOptions;
      console.log( objCode );

      const fullPath = id.split( '?' )[ 0 ];
      const fileData = readFileSync( fullPath, 'utf8' );
      const fileParsed = VueCompiler.parse( fileData );

      // console.log( fileData );
      // console.log( kakakaka );

      return `export default Comp => {
         Comp.eyeshare = ${ code }
      }`;
   }
};


export default function () {
   return vueEyesharePlugin;
}