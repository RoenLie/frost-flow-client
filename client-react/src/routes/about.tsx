import React from 'react';
import { Link, Switch } from "react-router-dom";
import { RouteWithSubRoutes } from "../App";


export default ( { routes }: any ) => {

   return (
      <div>
         <h2>About</h2>
         <ul>
            <li>
               <Link to="/about/cv">CV</Link>
            </li>
         </ul>

         <Switch>
            { routes.map( ( route: any, i: number ) => (
               <RouteWithSubRoutes key={ i } { ...route } />
            ) ) }
         </Switch>
      </div>
   );
};