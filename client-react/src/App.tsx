import React, { Suspense } from 'react';
import { Switch, Route, BrowserRouter, Link } from "react-router-dom";
import Layout, { layoutService } from "./features/layout/layout";
import { routes } from "./routes";


export default function App() {
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
}

// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
export function RouteWithSubRoutes( route: any ) {
   return (
      <Route
         path={ route.path }
         render={ props => (
            // pass the sub-routes down to keep nesting
            <route.component { ...props } routes={ route.routes } />
         ) }
      />
   );
}

const LayoutRouteWithSubRoutes = ( route: any ) => {
   layoutService.setLayout[ route.layout || 'default' ]();

   return (
      <Layout>
         <Route
            path={ route.path }
            render={ props => ( <route.component { ...props } routes={ route.routes } /> ) }
         />
      </Layout>
   );
};