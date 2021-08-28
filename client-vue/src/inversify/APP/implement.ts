interface IImplement {
   containerEntry: string;
   initialIntegration: string;
   defaults: {
      hierarchy: string[];
   };
   modules: {
      [ key: string ]: {
         domain: string;
         hierarchy: string[];
      }[];
   };
}


export default {
   containerEntry: 'custom',
   initialIntegration: 'int1',

   defaults: {
      hierarchy: [ 'custom', 'int1', 'core' ]
   },

   modules: {
      workspace: [
         {
            domain: 'SYS',
            // hierarchy: [ 'core' ]
            // hierarchy: [ 'int2', 'core' ]
            hierarchy: [ 'custom', 'int2', 'core' ]
         }
      ]
   }
} as IImplement;