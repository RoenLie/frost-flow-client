import { Container, ContainerModule } from "inversify";
import implement from "~/inversify/APP/implement";


const cargoCache = [] as { identifier: string[]; container: Container; }[];


const cargoContainer = ( modules: ContainerModule[], parent?: Container ) => {
   const container = new Container();
   modules.forEach( m => container.load( m ) );
   if ( parent ) container.parent = parent;

   return container;
};


/* builds up the container parent child structure and loads the correct modules */
export const cargoLoader2 = ( modules: string[], domain: string, { debug = false } ) => {
   if ( !implement.modules ) throw new Error( "Modules prop not present in implement file" );
   if ( !implement?.defaults?.hierarchy ) throw new Error( "Fallback default hierarchy has not been defined" );

   const cached = cargoCache.find( cc => {
      const exists = cc.identifier.every( id => modules.includes( id ) ) &&
         cc.identifier.length == modules.length;

      return exists;
   } );

   if ( cached ) {
      console.log( 'this cargo load has been cached' );
      return cached.container;
   }

   /* defined the hierarchy to be loaded into the differernt containers */
   const cargoHierarchies = modules.map( moduleName => {
      const explicitModuleHierarchy = implement.modules?.[ moduleName ]?.find( m => m.domain == domain )?.hierarchy;
      const hierarchy = explicitModuleHierarchy ? explicitModuleHierarchy : implement.defaults.hierarchy;
      return { moduleName, hierarchy };
   } );

   if ( debug ) console.log( 'cargoHierarchies', cargoHierarchies );

   /* find all available modules, transform import data into a useable form */
   const availableModules = Object
      .entries( import.meta.globEager( '../../**/*.module.*' ) )
      .map( entry => {
         const nameData = entry[ 0 ].split( '/' ).slice( -1 )[ 0 ].split( '.' ).slice( 0, 2 );
         const containerName = nameData[ 0 ];
         const moduleName = nameData[ 1 ];

         return { containerName, moduleName, module: entry[ 1 ].module };
      } );

   if ( debug ) console.log( 'availableModules', availableModules );

   const hierarchyLength = cargoHierarchies.reduce( ( acc, cur ) => {
      return cur.hierarchy.length > acc ? cur.hierarchy.length : acc;
   }, 0 );

   if ( debug ) console.log( 'hierarchy length', hierarchyLength );

   const normalizedCargoHierarchies = cargoHierarchies.map( ch => {
      if ( ch.hierarchy.length >= hierarchyLength ) return ch;

      const difference = hierarchyLength - ch.hierarchy.length;
      ch.hierarchy.splice( 1, 0, ...new Array( difference ).fill( '' ) );

      return ch;
   } );

   if ( debug ) console.log( 'normalizedCargoHierarchies', normalizedCargoHierarchies );

   const mergedModules = [] as any[][];

   normalizedCargoHierarchies.forEach( ch => {
      ch.hierarchy.forEach( ( h, i ) => {
         if ( !mergedModules?.[ i ] ) mergedModules[ i ] = [];

         const moduleToInsert = availableModules.find(
            am => am.containerName == h &&
               am.moduleName == ch.moduleName )?.module;

         if ( !moduleToInsert ) return;

         mergedModules[ i ] = [ ...mergedModules?.[ i ], moduleToInsert ];
      } );
   } );

   if ( debug ) console.log( 'merged modules', mergedModules );

   const containers = mergedModules.reduce( ( acc, cur, i ) => {

      const parent = !i ? undefined : acc[ i - 1 ];
      const container = cargoContainer( cur, parent );

      acc.push( container );

      return acc;
   }, [] ) as Container[];


   if ( debug ) console.log( 'containers', containers );

   // const unloader = () => {
   //    containers.forEach( ( c, i ) => {
   //       c.unbindAll();
   //       c.parent = null;
   //    } );

   //    console.log( 'unloaded containers', containers );
   // };

   cargoCache.push( {
      identifier: modules,
      container: containers[ containers.length - 1 ]
   } );

   return containers[ containers.length - 1 ];
};