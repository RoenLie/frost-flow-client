import { Route, Router } from '@vaadin/router';


const routes: Route[] = [
   {
      path: '/',
      component: 'lit-app',
      children: [
         {
            path: 'blog',
            component: 'lit-blog',
            action: async () => {
               await import( "../blog" );
            },
            children: [
               {
                  path: '',
                  redirect: '/blog/posts',
               },
               {
                  path: 'posts',
                  component: 'lit-blog-posts',
                  action: async () => {
                     await import( '../blog-posts' );
                  },
               },
               {
                  path: 'posts/:id',
                  component: 'lit-blog-post',
                  action: async () => {
                     await import( '../blog-post' );
                  },
               },
            ]
         },
         {
            path: '(.*)',
            component: 'frost-not-found',
            action: async () => {
               await import( "../features/notFound/index" );
            },
         },
      ]
   },
];

const outlet = document.getElementById( 'outlet' );
export const router = new Router( outlet );
router.setRoutes( routes );