interface IImplement {
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
   defaults: {
      hierarchy: [ 'custom', 'int1', 'core' ]
   },

   modules: {
      workspace: [
         {
            domain: 'SYS',
            // hierarchy: [ 'core' ]
            // hierarchy: [ 'int2', 'core' ]
            hierarchy: [ 'core', 'int1', 'custom1' ]
         },
         {
            domain: 'google',
            // hierarchy: [ 'core' ]
            // hierarchy: [ 'int2', 'core' ]
            hierarchy: [ 'core', 'int2', 'custom2' ]
         }
      ],
      list: [
         {
            domain: 'SYS',
            hierarchy: [ 'core', 'int1', 'custom' ]
         }
      ],
      document: [
         {
            domain: 'SYS',
            hierarchy: [ 'core', 'custom' ]
         }
      ]
   }
} as IImplement;