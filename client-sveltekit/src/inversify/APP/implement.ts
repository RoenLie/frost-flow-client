export type ModuleDefaults = { hierarchy: string[]; dependencies: string[]; };
export type ModuleExplicit = { realm: string; hierarchy: string[]; dependencies?: string[]; };
export type ModuleInfo = { defaults?: ModuleDefaults; explicits?: ModuleExplicit[]; };
export interface IDeclaration { defaults: ModuleDefaults; modules: { [ key: string ]: ModuleInfo; }; }


export const declaration: IDeclaration = {
   defaults: {
      hierarchy: [ 'custom', 'int1', 'core' ],
      dependencies: []
   },

   modules: {
      workspace: {
         defaults: {
            hierarchy: [ 'custom', 'int1', 'core' ],
            dependencies: []
         },
         explicits: []
      },
      list: {
         defaults: {
            hierarchy: [ 'custom', 'int1', 'core' ],
            dependencies: [ 'logger' ]
         },
         explicits: []
      },
      document: {
         defaults: {
            hierarchy: [ 'custom', 'int1', 'core' ],
            dependencies: [ 'logger' ]
         },
         explicits: [
            {
               realm: 'SYS',
               hierarchy: [ 'custom', 'int1', 'core' ],
               dependencies: [ 'logger', 'list' ]
            }
         ]
      },
      logger: {
         defaults: {
            hierarchy: [ 'custom', 'int1', 'core' ],
            dependencies: [ 'workspace' ]
         },
         explicits: []
      }
   }
};

export default {};

