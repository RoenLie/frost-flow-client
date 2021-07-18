import React, { Suspense, useMemo } from 'react';
import { Switch, Route, BrowserRouter, Redirect, useHistory, useLocation } from "react-router-dom";
import { routes } from "routes/routes";
import { Layout, layoutService } from "features";


export const App = () => {
   return (
      <BrowserRouter>
         <Suspense fallback={ <div>Loading route...</div> }>
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
            route.redirect
               ? <Redirect to={ route.redirect?.to } />
               : <route.component { ...props } routes={ route.routes } />
         ) }
      />
   </>
);


const LayoutRouteWithSubRoutes = ( route: any ) => {
   useMemo(
      () => layoutService.setLayout[ route.layout || 'default' ](),
      [ route.layout ]
   );

   const location = useLocation();

   return (
      <Layout>
         { route.redirect
            ? route.routes

               ? <Route
                  path={ route.path }
                  exact={ route.exact }
                  render={ props =>
                     <>
                        <route.component { ...props } routes={ route.routes }></route.component>
                        { route.redirect.from.some( ( r: string ) => r == location.pathname )
                           ? < Redirect to={ route.redirect?.to } />
                           : <></> }
                     </>
                  }
               />
               : < Redirect to={ route.redirect?.to } />

            : <Route
               path={ route.path }
               exact={ route.exact }
               render={ props => <route.component { ...props } routes={ route.routes } /> }
            />
         }
      </Layout>
   );
};