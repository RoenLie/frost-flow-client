import React, { Suspense } from 'react';

export interface RootLayouts {
   [ key: string ]: Function;
   default: Function;
   admin: Function;
}


class RootLayoutService {
   layouts: RootLayouts = {
      default: React.lazy( () => import( './default/default.layout' ) ),
      admin: React.lazy( () => import( './admin/admin.layout' ) )
   };

   layout: any = this.layouts.default;

   public get setLayout() {
      const layoutGenerators: RootLayouts = Object
         .keys( this.layouts )
         .reduce( ( prev: any, cur: string ) => {
            prev[ cur ] = () => this.layout = this.layouts[ cur ] || this.layouts.default;
            return prev;
         }, {} );

      return layoutGenerators;
   }
}


export const layoutService = new RootLayoutService();


export default ( { children }: any ) => {
   return (
      <>
         <Suspense fallback={ <div>Loading layout...</div> }>
            { React.createElement( layoutService.layout, {}, children ) }
         </Suspense>
      </>
   );
};