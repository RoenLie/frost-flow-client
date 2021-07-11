import React, { Suspense, useMemo } from 'react';
import { Switch, Route, BrowserRouter, Redirect, useHistory } from "react-router-dom";
import { routes } from "routes/routes";
import { Layout, layoutService } from "features";


export const App = () => {
   // console.log( 'App rendered' );

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
   <>
      <Route
         path={ route.path }
         exact={ route.exact }
         render={ props => ( // pass the sub-routes down to keep nesting
            <>
               <route.component { ...props } routes={ route.routes } />
               { route.redirect ? <Redirect to={ route.redirect?.to } /> : <></> }
            </>
         ) }
      />
   </>
);


const LayoutRouteWithSubRoutes = ( route: any ) => {
   useMemo(
      () => {
         layoutService.setLayout[ route.layout || 'default' ]();
      },
      [ route.layout ]
   );

   return (
      <Layout>
         {
            route.redirect
               ? (
                  <>
                     <Route
                        path={ route.path }
                        exact={ route.redirect?.exact }
                        render={ props => ( // pass the sub-routes down to keep nesting
                           <route.component { ...props } routes={ route.routes } />
                        ) }
                     />
                     <Redirect to={ route.redirect?.to } />
                  </>
               )
               : (
                  <Route
                     path={ route.path }
                     exact={ route.exact }
                     render={ props => <route.component { ...props } routes={ route.routes } /> }
                  />
               )
         }
      </Layout>
   );
};