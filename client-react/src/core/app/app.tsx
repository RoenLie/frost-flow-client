import React, { Suspense, useMemo } from 'react';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { routes } from "routes";
import { Layout, layoutService } from "features";


export const App = () => {
   return (
      <BrowserRouter>
         <Suspense fallback={ <div>Loading...</div> }>
            <Switch>
               { routes.map( ( route, i ) => (
                  <LayoutRouteWithSubRoutes key={ i } { ...route } />
               ) ) }
            </Switch>
         </Suspense>
      </BrowserRouter>
   );
};

// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
export const RouteWithSubRoutes = ( route: any ) => (
   <Route
      path={ route.path }
      render={ props => (
         // pass the sub-routes down to keep nesting
         <route.component { ...props } routes={ route.routes } />
      ) }
   />
);

const LayoutRouteWithSubRoutes = ( route: any ) => {

   useMemo( () => {
      layoutService.setLayout[ route.layout || 'default' ]();
      console.log( "layout changed" );
   }, [ route.layout ] );


   return (
      <Layout>
         <Route
            path={ route.path }
            render={ props => ( <route.component { ...props } routes={ route.routes } /> ) }
         />
      </Layout>
   );
};