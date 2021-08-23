// @ts-expect-error missing types
import jsYaml from "js-yaml";
import { readFileSync } from "fs";
import fsPath from "path";
import MagicString from 'magic-string';
import fastGlob from "fast-glob";
import VueCompiler from "@vue/compiler-sfc";


interface IOverrideBlock {
   path: string,
   filename: string,
   template: VueCompiler.SFCTemplateBlock | null,
   style: VueCompiler.SFCStyleBlock[],
   script: VueCompiler.SFCScriptBlock | null,
   eyeshare: VueCompiler.SFCBlock | undefined;
}

interface IEyeshareCoreBlock {
   overridable: ( 'template' | 'script' | 'style' )[];
   extendable: ( 'template' | 'script' | 'style' )[];
}
interface IEyeshareChangeBlock {
   overrides: ( 'template' | 'script' | 'style' )[];
   extends: ( 'template' | 'script' | 'style' )[];
}


const ERROR_MESSAGES = {
   notYamlOverrider: ( file?: string ) => ( {
      code: 'PARSE_ERROR',
      message: 'eyeshare custom block in the overriding file must be in lang="yaml"'
         + '\n' + file
   } ),
   notYamlOverridee: ( file?: string ) => ( {
      code: 'PARSE_ERROR',
      message: 'eyeshare custom block in the file being overriden must be in lang="yaml"'
         + '\n' + file
   } ),
   missingEyeshareBlock: ( file?: string ) => ( {
      code: 'PARSE_ERROR',
      message: 'missing eyeshare custom block in the file being overriden'
         + '\n' + file
   } ),
   errorParsingEyeshareBlock: ( file?: string ) => ( {
      code: 'PARSE_ERROR',
      message: 'could not parse the eyeshare block in the file being overriden'
         + '\n' + file
   } )
};


export default function VueEyeshare( options = {
   pathGlob: fsPath.join( process.cwd(), '/src/overrides/**/*' )
} ) {

   let overrides: IOverrideBlock[] = [];

   const resolveOverrides = () => {
      const files = fastGlob.sync( 'src/overrides/**/*' );

      const overrideBuilder = files.reduce( ( acc: IOverrideBlock[] = [], path ) => {
         const filename = path.split( '/' ).splice( -1 )[ 0 ];

         const fileContent = readFileSync( path, 'utf8' );
         const fileParsed = VueCompiler.parse( fileContent );

         const template = fileParsed.descriptor.template;
         const style = fileParsed.descriptor.styles;
         const script = fileParsed.descriptor.scriptSetup
            ? fileParsed.descriptor.scriptSetup
            : fileParsed.descriptor.script
               ? fileParsed.descriptor.script
               : null;
         const eyeshare = fileParsed.descriptor.customBlocks.find( block => {
            if ( block.type != 'eyeshare' ) return;
            return true;
         } );

         if ( !eyeshare ) return acc;

         acc.push( { path, filename, template, script, style, eyeshare } );
         return acc;
      }, [] as IOverrideBlock[] );

      overrides = overrideBuilder || [];
   };

   const parseStyleBlock = ( code: string, id: string ) => {
      // get filename from path.
      const filename = id.split( '/' ).slice( -1 )[ 0 ].split( '?' )[ 0 ];
      const dirPath = id.split( '/' ).slice( 0, -1 ).join( '/' );

      // get the original file.
      const originalFile = readFileSync( dirPath + '/' + filename, 'utf8' );
      // parse the file using the vue sfc compiler.
      const fileParsed = VueCompiler.parse( originalFile );

      // find the eyeshare custom block from the parsed file.
      const eyeshareBlock = fileParsed.descriptor.customBlocks
         .find( b => b.type == 'eyeshare' );

      if ( !eyeshareBlock ) return [ code, null ];

      // parse the content of the eyeshare block.
      const parsedEsBlock = jsYaml
         .safeLoad( eyeshareBlock?.content.trim() ) as IEyeshareCoreBlock;

      // find override data for this component by name.
      const overrideData = overrides.find( o => o.filename == filename ) as IOverrideBlock;

      const parsedChangeEsBlock = jsYaml
         .safeLoad( overrideData.eyeshare?.content.trim() ) as IEyeshareChangeBlock;

      // extend style tag
      const extendStyle = parsedEsBlock.extendable?.includes( 'style' )
         && parsedChangeEsBlock.extends?.includes( 'style' );

      const overrideStyle = parsedEsBlock.overridable?.includes( 'style' )
         && parsedChangeEsBlock.overrides?.includes( 'style' );

      const magicString = new MagicString( code );
      let changed = false;

      if ( extendStyle ) {
         const style = code;
         const end = style.length;
         const content = overrideData.style.map( s => s.content ).join( "\n" );

         magicString.appendRight( end, content );

         changed = true;
      } else if ( overrideStyle ) {
         const style = code;
         const start = 0;
         const end = style.length;
         const content = overrideData.style.map( s => s.content ).join( "\n" );

         magicString.overwrite( start, end, content );

         changed = true;
      }

      const watchPath = fsPath.join( process.cwd(), overrideData.path );
      const magicStringCleaned = magicString.toString().replace( /\/\/.*;/g, '' );
      const returnCode = changed ? magicStringCleaned : code;

      return [ returnCode, watchPath ];
   };

   const parseEyeshareBlock = ( code: string, id: string ) => {
      if ( /\.ya?ml$/.test( id ) ) {
         code = JSON.stringify( jsYaml.safeLoad( code.trim() ) );
      }

      return `export default Comp => {
         Comp.eyeshare = ${ code }
      }`;
   };

   return {
      // enforce: 'pre',
      name: 'vue-eyeshare',
      warn: ( { code, message }: { code: string, message: string; } ) => { },
      addWatchFile: ( file: string ) => { },
      buildStart() {
         resolveOverrides();
         // const files = fastGlob.sync( 'src/overrides/**/*' );
         // files.forEach( file => {
         //    this.addWatchFile( fsPath.join( process.cwd(), file ) );
         //    console.log( 'adding file to watch', fsPath.join( process.cwd(), file ) );
         // } );
      },
      handleHotUpdate() {
         resolveOverrides();
      },
      transform( code: string, id: string ) {
         // transform eyeshare codeblock and return to avoid compile errors.
         if ( /vue&type=eyeshare/.test( id ) ) return parseEyeshareBlock( code, id );
         if ( /vue&type=style/.test( id ) ) {
            const [ style, watchPath ] = parseStyleBlock( code, id );
            if ( watchPath ) this.addWatchFile( watchPath + '?vue&type=style&index=0&scoped=true&lang.scss' );
            return style;
         }

         // return if it is not a vue file.
         if ( !/\.vue$/.test( id ) ) return;

         // get filename from path.
         const filename = id.split( '/' ).slice( -1 )[ 0 ];

         // find override data for this component by name.
         const overrideData = overrides.find( o => o.filename == filename );

         // return if override data cannot be found for this component.
         if ( !overrideData ) return;

         // return if the eyeshare block overriding this one is not in yaml.
         if ( overrideData.eyeshare?.lang != 'yaml' ) {
            this.warn( ERROR_MESSAGES.notYamlOverrider( overrideData.path ) );
            return;
         }

         // parse the file using the vue sfc compiler.
         const fileParsed = VueCompiler.parse( code );

         // find the eyeshare custom block from the parsed file.
         const eyeshareBlock = fileParsed.descriptor.customBlocks
            .find( b => b.type == 'eyeshare' );

         // return if there is no eyeshare block.
         if ( !eyeshareBlock ) {
            this.warn( ERROR_MESSAGES.missingEyeshareBlock( id ) );
            return;
         }

         // return if the eyeshare block  in the file being overriden is not in yaml.
         if ( eyeshareBlock.lang != 'yaml' ) {
            this.warn( ERROR_MESSAGES.notYamlOverridee( id ) );
            return;
         }

         // parse the content of the eyeshare block.
         const parsedEsBlock = jsYaml
            .safeLoad( eyeshareBlock.content.trim() ) as IEyeshareCoreBlock;

         // return if eyeshare block cannot be parsed.
         if ( !parsedEsBlock ) {
            this.warn( ERROR_MESSAGES.errorParsingEyeshareBlock( id ) );
            return;
         }

         // parse the content of override eyeshare block.
         const parsedChangeEsBlock = jsYaml
            .safeLoad( overrideData.eyeshare.content.trim() ) as IEyeshareChangeBlock;

         // return if eyeshare change block cannot be parsed.
         if ( !parsedChangeEsBlock ) {
            this.warn( ERROR_MESSAGES.errorParsingEyeshareBlock( overrideData.path ) );
            return;
         }



         // create an instance of magic string used for string manipulation.
         const magicString = new MagicString( code );

         // indicates that something has been modified in the file
         let changed = false;

         // extend script tag
         const extendScript = parsedEsBlock.extendable?.includes( 'script' )
            && parsedChangeEsBlock.extends?.includes( 'script' );

         const overrideScript = parsedEsBlock.overridable?.includes( 'script' )
            && parsedChangeEsBlock.overrides?.includes( 'script' );

         if ( extendScript ) {
            const scriptSetup = fileParsed.descriptor.scriptSetup;

            const end = scriptSetup?.loc.end.offset as number;
            const content = overrideData.script?.content || "";
            magicString.appendRight( end, content );

            changed = true;
         } else if ( overrideScript ) {
            const scriptSetup = fileParsed.descriptor.scriptSetup;

            const start = scriptSetup?.loc.start.offset as number;
            const end = scriptSetup?.loc.end.offset as number;
            const content = overrideData.script?.content || "";
            magicString.overwrite( start, end, content );

            changed = true;
         }

         // extend style tag
         const extendStyle = parsedEsBlock.extendable?.includes( 'style' )
            && parsedChangeEsBlock.extends?.includes( 'style' );

         const overrideStyle = parsedEsBlock.overridable?.includes( 'style' )
            && parsedChangeEsBlock.overrides?.includes( 'style' );

         if ( extendStyle ) {
            const styles = fileParsed.descriptor.styles;
            const end = styles.slice( -1 )[ 0 ].loc.end.offset;
            const content = overrideData.style.map( s => s.content ).join( "\n" );

            magicString.appendRight( end, content );
            changed = true;
         } else if ( overrideStyle ) {
            const styles = fileParsed.descriptor.styles;
            const start = styles[ 0 ].loc.start.offset;
            const end = styles.slice( -1 )[ 0 ].loc.end.offset;
            const content = overrideData.style.map( s => s.content ).join( "\n" );

            magicString.overwrite( start, end, content );
            changed = true;
         }

         // extend template tag
         const extendTemplate = parsedEsBlock.extendable?.includes( 'template' )
            && parsedChangeEsBlock.extends?.includes( 'template' );

         const overrideTemplate = parsedEsBlock.overridable?.includes( 'template' )
            && parsedChangeEsBlock.overrides?.includes( 'template' );

         if ( extendTemplate ) {
            const start = fileParsed.descriptor.template?.loc.start.offset as number;
            const end = fileParsed.descriptor.template?.loc.end.offset as number;
            const content = overrideData.template?.content as string;

            magicString.appendRight( end, content + `</div>` );
            magicString.prependLeft( start, `<div>` );

            changed = true;
         } else if ( overrideTemplate ) {
            const start = fileParsed.descriptor.template?.loc.start.offset as number;
            const end = fileParsed.descriptor.template?.loc.end.offset as number;
            const content = overrideData.template?.content as string;

            magicString.overwrite( start, end, content );

            changed = true;
         }

         const watchPath = fsPath.join( process.cwd(), overrideData.path );
         this.addWatchFile( watchPath );

         return {
            code: changed ? magicString.toString() : code
         };
      }
   };
}