import type { IDeclaration } from "~/inversify/APP/implement";

type GetExplicitDetails = (
   declaration: IDeclaration,
   module: string,
   realm: string
) => { module: string, realm?: string; hierarchy: string[]; dependencies?: string[]; };
export const getExplicitDetails: GetExplicitDetails = ( declaration, module, realm ) => {
   const moduleDefined = declaration.modules[ module ];
   if ( !moduleDefined ) return { module, ...declaration.defaults };

   const defaultsDefined = moduleDefined.defaults;
   const explicitlyDefined = moduleDefined?.explicits.find( m => m.realm == realm );

   const details = explicitlyDefined || defaultsDefined || declaration.defaults;

   return { module, ...details };
};


type MapDependencies = (
   declaration: IDeclaration,
   realm: string,
   deps: string[],
   mapout?: Map<string, Record<string, unknown>>
) => Map<string, { module: string; hierarchy: string[]; dependencies: string[]; }>;
export const mapDependencies: MapDependencies = ( declaration, realm, deps, mapout?) => {
   const moduleInfo = mapout || new Map();

   deps.forEach( d => {
      const details = getExplicitDetails( declaration, d, realm );
      if ( moduleInfo.has( d ) ) return;
      moduleInfo.set( d, details );

      if ( !details?.dependencies ) return;
      mapDependencies( declaration, realm, details.dependencies, moduleInfo );
   } );

   return moduleInfo;
};