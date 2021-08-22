// @ts-expect-error missing types
import jsYaml from "js-yaml";
import { readFileSync, readdirSync } from "fs";
import fsPath from "path";
import MagicString from 'magic-string';
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
   overridePath: fsPath.join( process.cwd(), '/src/overrides' )
} ) {

   let overrides: IOverrideBlock[] = [];

   const resolveOverrides = () => {
      const files = readdirSync( options.overridePath );

      const overrideBuilder = files.reduce( ( acc: IOverrideBlock[] = [], filename ) => {
         const fileContent = readFileSync(
            options.overridePath + '/' + filename,
            'utf8'
         );
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

         if ( !eyeshare ) return;

         acc.push( {
            path: options.overridePath + '/' + filename,
            filename,
            template,
            script,
            style,
            eyeshare
         } );
         return acc;
      }, [] as IOverrideBlock[] );

      overrides = overrideBuilder || [];
   };

   return {
      // enforce: 'pre',
      name: 'vue-eyeshare',
      warn: ( { code, message }: { code: string, message: string; } ) => { },
      buildStart() {
         resolveOverrides();
      },
      handleHotUpdate() {
         resolveOverrides();
      },
      transform( code: string, id: string ) {
         // console.log( overrides );
         // console.log( id );

         // transform eyeshare codeblock and return to avoid compile errors.
         if ( /vue&type=eyeshare/.test( id ) ) return parseEyeshareBlock( code, id );
         if ( /vue&type=style/.test( id ) ) return parseStyleBlock( code );

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
         const extendScript = parsedEsBlock.extendable.includes( 'script' )
            && parsedChangeEsBlock.extends.includes( 'script' );

         const overrideScript = parsedEsBlock.overridable.includes( 'script' )
            && parsedChangeEsBlock.overrides.includes( 'script' );

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
         const extendStyle = parsedEsBlock.extendable.includes( 'style' )
            && parsedChangeEsBlock.extends.includes( 'style' );

         const overrideStyle = parsedEsBlock.overridable.includes( 'style' )
            && parsedChangeEsBlock.overrides.includes( 'style' );

         if ( extendStyle ) {
            // console.log( 'extending styles' );
            const styles = fileParsed.descriptor.styles;
            // console.log( 'orig', styles[ 0 ].content );

            const end = styles.slice( -1 )[ 0 ].loc.end.offset;
            const content = overrideData.style.map( s => s.content ).join( "\n" );
            // console.log( 'new', content );

            magicString.appendRight( end, content );
            changed = true;
         } else if ( overrideStyle ) {
            // console.log( 'overriding styles' );

            const styles = fileParsed.descriptor.styles;
            // console.log( 'orig', styles[ 0 ].content );

            const start = styles[ 0 ].loc.start.offset;
            const end = styles.slice( -1 )[ 0 ].loc.end.offset;
            const content = overrideData.style.map( s => s.content ).join( "\n" );
            // console.log( 'new', content );

            magicString.overwrite( start, end, content );
            changed = true;
         }

         // extend template tag
         const extendTemplate = parsedEsBlock.extendable.includes( 'template' )
            && parsedChangeEsBlock.extends.includes( 'template' );

         const overrideTemplate = parsedEsBlock.overridable.includes( 'template' )
            && parsedChangeEsBlock.overrides.includes( 'template' );

         if ( extendTemplate ) {
            const end = fileParsed.descriptor.template?.loc.end.offset as number;
            const content = overrideData.template?.content as string;

            magicString.appendRight( end, content );
            changed = true;
         } else if ( overrideTemplate ) {
            const start = fileParsed.descriptor.template?.loc.start.offset as number;
            const end = fileParsed.descriptor.template?.loc.end.offset as number;
            const content = overrideData.template?.content as string;

            magicString.overwrite( start, end, content );

            changed = true;
         }

         return {
            code: changed ? magicString.toString() : code
         };
      }
   };
}


const parseStyleBlock = ( code: string ) => {
   return code;
};


const parseEyeshareBlock = ( code: string, id: string ) => {
   if ( /\.ya?ml$/.test( id ) ) {
      code = JSON.stringify( jsYaml.safeLoad( code.trim() ) );
   }

   return `export default Comp => {
      Comp.eyeshare = ${ code }
   }`;
};