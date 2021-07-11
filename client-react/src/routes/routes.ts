import React from "react";


export const routes = [
   {
      label: 'Home',
      path: '/home',
      component: React.lazy( () => import( './home.route' ) ),
      layout: 'default'
   },
   {
      label: 'Epoch',
      path: '/epoch',
      layout: 'default',
      component: React.lazy( () => import( './epoch.route' ) ),
      routes: [
         {
            label: 'Home',
            path: '/epoch/home',
            layout: 'default',
            icon: 'home_solid',
            component: React.lazy( () => import( './epoch.home.route' ) ),
         },
         {
            label: 'Workspace',
            path: '/epoch/workspace',
            layout: 'default',
            icon: 'list_solid',
            component: React.lazy( () => import( './epoch.workspace.route' ) ),
         }
      ]
   },
   {
      label: 'Toast',
      path: '/toast',
      layout: 'default',
      component: React.lazy( () => import( './toast.route' ) )
   },
   {
      path: '/',
      exact: true,
      component: React.lazy( () => import( './home.route' ) ),
   },
   {
      path: '*',
      component: React.lazy( () => import( './not-found.route' ) ),
   }
   // { // Example of how to nest routes 
   //    path: "/about",
   //    layout: "admin",
   //    component: React.lazy( () => import( './about.route' ) ),
   //    routes: [
   //       {
   //          path: "/about/cv",
   //          component: React.lazy( () => import( './cv.route' ) ),
   //       }
   //    ]
   // },
];