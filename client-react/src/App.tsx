import React, { useState } from 'react';
import './App.scss';
import {
   BrowserRouter as Router,
   Switch,
   Route,
} from "react-router-dom";
import Layout, { layoutService } from "./features/layout/layout";



export default function App() {
   return (
      <Router>
         <Layout>
            {/* A <Switch> looks through its children <Route>s and
               renders the first one that matches the current URL. */}
            <Switch>
               <Route path="/home">
                  <Home />
               </Route>
               <Route path="/about">
                  <About />
               </Route>
               <Route path="/users">
                  <Users />
               </Route>
               <Route path="/">
                  <Home />
               </Route>
            </Switch>
         </Layout>
      </Router>
   );
}


function Home() {
   return <h2>Home</h2>;
}

function About() {
   const AdminLayout = React.lazy( () => import( './features/layout/admin/admin.layout' ) );

   const changeToAdminLayout = () => {
      layoutService.setComponent( AdminLayout );
   };

   return (
      <>
         <h2>About</h2>
         <button onClick={ changeToAdminLayout }>Change to Admin Layout</button>
      </>
   );
}

function Users() {
   return <h2>Users</h2>;
}