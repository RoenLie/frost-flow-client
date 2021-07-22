import { lazy } from "react";


const routeComponents = {
   home: lazy( () => import( './home.route' ) ),
   epoch: lazy( () => import( './epoch.route' ) ),
   epochHome: lazy( () => import( './epoch.home.route' ) ),
   epochWorkspace: lazy( () => import( './epoch.workspace.route' ) ),
   toast: lazy( () => import( './toast.route' ) ),
   notFound: lazy( () => import( './not-found.route' ) )
};


export const routes = [
   {
      label: 'Home',
      path: '/home',
      component: routeComponents.home,
      layout: 'admin'
   },
   {
      label: 'Epoch',
      path: '/epoch',
      layout: 'default',
      redirect: {
         from: [ '/epoch', '/epoch/' ],
         to: '/epoch/home'
      },
      component: routeComponents.epoch,
      routes: [
         {
            label: 'Home',
            path: '/epoch/home',
            layout: 'default',
            icon: 'home_solid',
            component: routeComponents.epochHome
         },
         {
            label: 'Workspace',
            path: '/epoch/workspace',
            layout: 'default',
            icon: 'list_solid',
            component: routeComponents.epochWorkspace
         }
      ]
   },
   {
      label: 'Toast',
      path: '/toast',
      layout: 'default',
      component: routeComponents.toast
   },
   {
      label: 'Workflow',
      path: '/workflow',
      layout: 'default',
      component: routeComponents.toast
   },
   {
      path: '/',
      exact: true,
      redirect: {
         to: '/home'
      }
   },
   {
      path: '*',
      component: routeComponents.notFound,
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