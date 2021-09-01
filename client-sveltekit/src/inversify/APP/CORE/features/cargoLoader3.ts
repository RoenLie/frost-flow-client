import { Container, ContainerModule } from "inversify";
import { mutateObject } from "~/inversify/APP/CORE/features/mutateObject";
import { StringCompareMap } from "~/inversify/APP/CORE/features/StringCompareMap";
import { declaration } from "~/inversify/APP/implement";
import type { IDeclaration } from "~/inversify/APP/implement";
import { getExplicitDetails, mapDependencies } from "~/inversify/APP/CORE/features/cargoLoaderHelpers";
/* --------------------------------------------------------------------------------------------- */

const cargoCache = [] as { modules: string[]; realm: string; container: Container; }[];

/* --------------------------------------------------------------------------------------------- */

const cargoContainer = ( modules: ContainerModule[], parent?: Container ) => {
   const container = new Container();
   modules.forEach( m => container.load( m ) );
   if ( parent ) container.parent = parent;

   return container;
};

/* --------------------------------------------------------------------------------------------- */

// type CargoLoader = ( modules: string[], realm: string, options?: { debug: boolean; fileNameOrder: string[]; } ) => Promise<[ Container, () => void ]>;
type CargoLoader = ( module: string, realm: string, options?: { debug: boolean; fileNameOrder: string[]; } ) => [ Container, () => void ];
/* builds up the container parent child structure and loads the correct modules */
export const cargoLoader3: CargoLoader = ( module, realm, options = { debug: false, fileNameOrder: [ 'realm', 'module' ] } ) => {
   if ( !declaration.modules ) throw new Error( "Modules prop not present in implement file" );
   if ( !declaration?.defaults?.hierarchy ) throw new Error( "Fallback default hierarchy has not been defined" );
   const { debug, fileNameOrder } = options;


   // const unloader = ( containerEntry: Container ) => {
   //    let intermediate: Container | null = null;
   //    let cContainer: Container | null = containerEntry;

   //    do {
   //       cContainer.unbindAll();
   //       intermediate = cContainer.parent as Container | null;
   //       cContainer.parent = null;
   //       cContainer = intermediate as Container | null;
   //    } while ( cContainer );

   //    console.log( 'unloaded containers', containers );
   // };


   // const cached = cargoCache.find( cc => {
   //    const exists = cc.modules.every( id => modules.includes( id ) ) &&
   //       cc.modules.length == modules.length &&
   //       cc.realm == realm;

   //    return exists;
   // } );


   // if ( cached ) {
   //    console.log( 'returning cached cargo load.' );
   //    return [ cached.container, () => unloader( cached.container ) ] as [ Container, () => void ];
   // }


   /* defined the hierarchy to be loaded into the differernt containers */
   // const cargoHierarchies = modules.map( moduleName => {
   //    const explicitModuleHierarchy = implement.modules?.[ moduleName ]?.find( m => m.realm == realm )?.hierarchy;
   //    const hierarchy = explicitModuleHierarchy ? explicitModuleHierarchy : implement.defaults.hierarchy;
   //    return { moduleName, hierarchy };
   // } );


   /* find all available modules, transform import data into a useable form */
   console.clear();

   const moduleExplicitDetails = getExplicitDetails( declaration, module, realm );
   const moduleDetails = { module, ...moduleExplicitDetails };

   console.log( moduleDetails );

   const dependencyMap = mapDependencies(
      declaration,
      realm,
      moduleDetails.dependencies,
      new Map( [ [ moduleDetails.module, moduleDetails ] ] )
   );

   console.log( dependencyMap );

   /* Check cache if each dependency exists with the correct hierarchy */


   /* if any of the hierarchies do not exist, create them using any already cached containers */







   const imports = import.meta.globEager( '../../**/*.module.*' );

   const extractRealmAndModule = ( s: string ) => s.split( '/' ).pop().split( '.' ).slice( 0, 2 ).join();
   const importsRenamed = mutateObject( imports, ( k, v ) => [ extractRealmAndModule( k ), v ] );

   // console.log( importsRenamed );

   const importsArr = Object.entries( importsRenamed ).map( ( en ) => {
      const nameData = en[ 0 ].split( ',' );
      return { realm: nameData[ 0 ], module: nameData[ 1 ], value: en[ 1 ] };
   } );

   // console.log( importsArr );

   const importsFiltered = importsArr.filter( ( impData ) => module == impData.module );

   // console.log( importsFiltered );



   /* ------------------------------------------------------------------------------------------------------ */

   // const availableModules = Object
   //    .entries( imports )
   //    .map( entry => {
   //       const nameData = entry[ 0 ].split( '/' ).slice( -1 )[ 0 ].split( '.' ).slice( 0, 2 );
   //       const containerName = nameData[ 0 ];
   //       const moduleName = nameData[ 1 ];

   //       return { containerName, moduleName, module: entry[ 1 ].module };
   //    } );


   // const hierarchyLength = cargoHierarchies.reduce( ( acc, cur ) => {
   //    return cur.hierarchy.length > acc ? cur.hierarchy.length : acc;
   // }, 0 );


   // const normalizedCargoHierarchies = cargoHierarchies.map( ch => {
   //    if ( ch.hierarchy.length >= hierarchyLength ) return ch;

   //    const difference = hierarchyLength - ch.hierarchy.length;
   //    ch.hierarchy.splice( 1, 0, ...new Array( difference ).fill( '' ) );

   //    return ch;
   // } );


   // const mergedModules = [] as any[][];


   // normalizedCargoHierarchies.forEach( ch => {
   //    ch.hierarchy.forEach( ( h, i ) => {
   //       if ( !mergedModules?.[ i ] ) mergedModules[ i ] = [];

   //       const moduleToInsert = availableModules.find(
   //          am => am.containerName == h &&
   //             am.moduleName == ch.moduleName )?.module;

   //       if ( !moduleToInsert ) return;

   //       mergedModules[ i ] = [ ...mergedModules?.[ i ], moduleToInsert ];
   //    } );
   // } );


   // const containers = mergedModules.reduce( ( acc, cur, i ) => {

   //    const parent = !i ? undefined : acc[ i - 1 ];
   //    const container = cargoContainer( cur, parent );

   //    acc.push( container );

   //    return acc;
   // }, [] ) as Container[];


   // const returnContainer = containers[ containers.length - 1 ];


   // cargoCache.push( {
   //    modules: modules,
   //    realm: realm,
   //    container: containers[ containers.length - 1 ]
   // } );


   return [ new Container(), () => ( {} ) ];
};