import React, { Suspense } from 'react';
import { Switch, Route, BrowserRouter, Redirect, useLocation } from "react-router-dom";
import { routes } from "routes/routes";
import { Layout } from "features";


export const App = () => (
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


// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
export const RouteWithSubRoutes = ( route: any ) => (
   <Route
      path={ route.path }
      exact={ route.exact }
      render={ props => ( // pass the sub-routes down to keep nesting
         route.redirect
            ? <Redirect to={ route.redirect?.to } />
            : <route.component { ...props } routes={ route.routes } />
      ) }
   />
);


const LayoutRouteWithSubRoutes = ( route: any ) => {
   const location = useLocation();

   return (
      <Layout layout={ route.layout }>
         { route.redirect
            ? route.routes
               ? <Route
                  path={ route.path }
                  exact={ route.exact }
                  render={ props =>
                     <>
                        <route.component { ...props } routes={ route.routes } />
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