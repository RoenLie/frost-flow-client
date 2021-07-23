import React, { memo, Suspense, useMemo, useState } from 'react';

export type LazyJSXElement = React.LazyExoticComponent<( { children }: any ) => JSX.Element>;
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

   #Layout: LazyJSXElement = this.layouts.default as LazyJSXElement;

   #setLayout: Function;
   bind( Layout: LazyJSXElement, setLayout: Function ) {
      this.#Layout = Layout;
      this.#setLayout = setLayout;
   }

   public get setLayout() {
      const layoutGenerators: RootLayouts = Object
         .keys( this.layouts )
         .reduce( ( prev: any, cur: string ) => {
            prev[ cur ] = () => this.#setLayout( this.layouts[ cur ] || this.layouts.default );
            return prev;
         }, {} );

      return layoutGenerators;
   }
}


export const layoutService = new RootLayoutService();


export const Layout = memo( ( { layout, children }: any ) => {
   const [ Layout, setLayout ]: [ LazyJSXElement, Function ] = useState( layoutService.layouts.default as any );

   useMemo( () => layoutService.bind( Layout, setLayout ), [] );
   useMemo( () => layoutService.setLayout[ layout || 'default' ](), [ layout ] );


   return (
      <Suspense fallback={ <div>Loading layout...</div> }>
         <Layout>{ children }</Layout>
      </Suspense>
   );
} );