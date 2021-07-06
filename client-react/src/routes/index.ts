import React from "react";


export const routes = [
   {
      path: "/home",
      component: React.lazy( () => import( '../routes/home' ) ),
      layout: "default"
   },
   {
      path: "/about",
      layout: "admin",
      component: React.lazy( () => import( '../routes/about' ) ),
      routes: [
         {
            path: "/about/cv",
            component: React.lazy( () => import( '../routes/cv' ) ),
         }
      ]
   },
   {
      path: "/",
      component: React.lazy( () => import( '../routes/home' ) ),
   },
   {
      path: "*",
      component: React.lazy( () => import( '../routes/not-found' ) ),
   }
];