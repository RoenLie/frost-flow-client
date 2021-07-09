import React from "react";


export const routes = [
   {
      path: "/home",
      component: React.lazy( () => import( './home.route' ) ),
      layout: "default"
   },
   {
      path: "/about",
      layout: "admin",
      component: React.lazy( () => import( './about.route' ) ),
      routes: [
         {
            path: "/about/cv",
            component: React.lazy( () => import( './cv.route' ) ),
         }
      ]
   },
   {
      path: '/toast',
      layout: 'default',
      component: React.lazy( () => import( './toast.route' ) )
   },
   {
      path: "/",
      component: React.lazy( () => import( './home.route' ) ),
   },
   {
      path: "*",
      component: React.lazy( () => import( './not-found.route' ) ),
   }
];