import React from 'react';
const DefaultLayout = React.lazy( () => import( './default/default.layout' ) );

class LayoutService {
   component: any = DefaultLayout;
   setComponent: Function = () => { };
}
export const layoutService = new LayoutService();

