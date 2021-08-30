import { Container, ContainerModule } from "inversify";
import implement from "features/inversify/APP/implement";

/* --------------------------------------------------------------------------------------------- */

const cargoCache = [] as { modules: string[]; domain: string; container: Container; }[];

/* --------------------------------------------------------------------------------------------- */

const cargoContainer = ( modules: ContainerModule[], parent?: Container ) => {
   const container = new Container();
   modules.forEach( m => container.load( m ) );
   if ( parent ) container.parent = parent;

   return container;
};

/* --------------------------------------------------------------------------------------------- */

/* builds up the container parent child structure and loads the correct modules */
export const cargoLoader2 = ( modules: string[], domain: string, { debug = false } ) => {
   if ( !implement.modules ) throw new Error( "Modules prop not present in implement file" );
   if ( !implement?.defaults?.hierarchy ) throw new Error( "Fallback default hierarchy has not been defined" );


   const unloader = ( containerEntry: Container ) => {
      let intermediate: Container | null = null;
      let cContainer: Container | null = containerEntry;

      do {
         cContainer.unbindAll();
         intermediate = cContainer.parent as Container | null;
         cContainer.parent = null;
         cContainer = intermediate as Container | null;
      } while ( cContainer );

      console.log( 'unloaded containers', containers );
   };


   const cached = cargoCache.find( cc => {
      const exists = cc.modules.every( id => modules.includes( id ) ) &&
         cc.modules.length == modules.length &&
         cc.domain == domain;

      return exists;
   } );

   if ( cached ) {
      console.log( 'returning cached cargo load.' );
      return [ cached.container, () => unloader( cached.container ) ] as [ Container, () => void ];
   }


   /* defined the hierarchy to be loaded into the differernt containers */
   const cargoHierarchies = modules.map( moduleName => {
      const explicitModuleHierarchy = implement.modules?.[ moduleName ]?.find( m => m.domain == domain )?.hierarchy;
      const hierarchy = explicitModuleHierarchy ? explicitModuleHierarchy : implement.defaults.hierarchy;
      return { moduleName, hierarchy };
   } );


   /* find all available modules, transform import data into a useable form */
   const imports = import.meta.globEager( '../../**/*.module.*' );

   // change it to lazy import modules so that the use of this function will not pull all modules.
   // doing this will make this function async, but that should be survivable.
   // const imports = import.meta.glob( '../../**/*.module.*' ); 


   const availableModules = Object
      .entries( imports )
      .map( entry => {
         const nameData = entry[ 0 ].split( '/' ).slice( -1 )[ 0 ].split( '.' ).slice( 0, 2 );
         const containerName = nameData[ 0 ];
         const moduleName = nameData[ 1 ];

         return { containerName, moduleName, module: entry[ 1 ].module };
      } );


   const hierarchyLength = cargoHierarchies.reduce( ( acc, cur ) => {
      return cur.hierarchy.length > acc ? cur.hierarchy.length : acc;
   }, 0 );


   const normalizedCargoHierarchies = cargoHierarchies.map( ch => {
      if ( ch.hierarchy.length >= hierarchyLength ) return ch;

      const difference = hierarchyLength - ch.hierarchy.length;
      ch.hierarchy.splice( 1, 0, ...new Array( difference ).fill( '' ) );

      return ch;
   } );


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


   const containers = mergedModules.reduce( ( acc, cur, i ) => {

      const parent = !i ? undefined : acc[ i - 1 ];
      const container = cargoContainer( cur, parent );

      acc.push( container );

      return acc;
   }, [] ) as Container[];


   if ( debug ) console.log( 'cargoHierarchies', cargoHierarchies );
   if ( debug ) console.log( 'availableModules', availableModules );
   if ( debug ) console.log( 'hierarchy length', hierarchyLength );
   if ( debug ) console.log( 'normalizedCargoHierarchies', normalizedCargoHierarchies );
   if ( debug ) console.log( 'containers', containers );
   if ( debug ) console.log( 'merged modules', mergedModules );


   const returnContainer = containers[ containers.length - 1 ];


   cargoCache.push( {
      modules: modules,
      domain: domain,
      container: containers[ containers.length - 1 ]
   } );


   return [ returnContainer, () => unloader( returnContainer ) ] as [ Container, () => void ];
};