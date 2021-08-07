import { lazy } from "react";
import { IReactRoute } from "routes/types";


const routeComponents = {
   home: lazy( () => import( './home.route' ) ),
   epoch: lazy( () => import( './epoch.route' ) ),
   epochHome: lazy( () => import( './epoch.home.route' ) ),
   epochWorkspace: lazy( () => import( './epoch.workspace.route' ) ),
   epochList: lazy( () => import( './epoch.list.route' ) ),
   epochRecord: lazy( () => import( './epoch.record.route' ) ),
   notFound: lazy( () => import( './not-found.route' ) )
};


export const routes: IReactRoute[] = [
   {
      label: 'Home',
      path: '/home',
      component: routeComponents.home,
      layout: 'default'
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
            icon: 'home-solid',
            component: routeComponents.epochHome
         },
         {
            label: 'List',
            path: '/epoch/list',
            layout: 'default',
            icon: 'list-solid',
            component: routeComponents.epochList
         },
         {
            path: '/epoch/record',
            layout: 'default',
            component: routeComponents.epochRecord
         },
         {
            label: 'Workspace',
            path: '/epoch/workspace',
            layout: 'default',
            icon: 'dice-d6-solid',
            component: routeComponents.epochWorkspace
         },
         {
            label: 'Settings',
            path: '/epoch/settings',
            layout: 'default',
            icon: 'cog-solid',
            component: routeComponents.epochWorkspace
         }
      ]
   },
   {
      label: 'Workflow',
      path: '/workflow',
      layout: 'default',
      component: routeComponents.notFound
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