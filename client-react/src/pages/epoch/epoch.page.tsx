import React, { Suspense } from 'react';
import styles from './styles.module.css';
import { Link, Switch, useLocation } from "react-router-dom";
import { RouteWithSubRoutes } from "core";
import { SvgIcon } from "features";


export const Epoch = ( { routes }: any ) => {
   const location = useLocation();
   const routeEpochTab = routes.find( ( r: any ) => r.path == location.pathname );

   return (
      <div className={ styles.host }>

         <section className={ styles.nav }>
            { routes.filter( r => r.icon ).map( ( route: any, i: number ) => (
               <Link key={ i } to={ route.path } title={ route.label }
                  className={ routeEpochTab?.path == route.path ? styles.active : '' }>
                  <SvgIcon svgName={ route.icon } size="medium" />
               </Link>
            ) ) }
         </section>

         <section className={ styles.content }>
            <Suspense fallback={ <div>Loading epoch...</div> }>
               <Switch>
                  { routes.map( ( route: any, i: number ) => (
                     <RouteWithSubRoutes key={ i } { ...route } />
                  ) ) }
               </Switch>
            </Suspense>
         </section>

      </div>
   );
};