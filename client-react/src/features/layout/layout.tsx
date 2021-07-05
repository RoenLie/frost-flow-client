import React, { Suspense, useState } from 'react';
import { useHistory } from 'react-router-dom';


const DefaultLayout = React.lazy( () => import( './default/default.layout' ) );
const AdminLayout = React.lazy( () => import( './admin/admin.layout' ) );


class LayoutService {
   readonly component: any = DefaultLayout;
   setComponent: Function = () => { };
}
export const layoutService = new LayoutService();

export default ( { children }: any ) => {

   const [ layoutComponent, setLayoutComponent ] = useState( layoutService.component );
   layoutService.setComponent = setLayoutComponent;

   const history = useHistory();

   const navigate = ( path: string, layoutComponent?: any ) => {

      history.push( {
         pathname: path,
         state: {
            component: 'your tag value'
         }
      } );

      if ( layoutComponent )
         layoutService.setComponent( layoutComponent );
   };

   return (
      <>
         <div>
            <header>Hei</header>
            <nav>
               <ul>
                  <li>
                     <div onClick={ () => navigate( '/', DefaultLayout ) }>HOME</div>
                  </li>
                  <li>
                     <div onClick={ () => navigate( '/about' ) }>ABOUT</div>
                  </li>
                  <li>
                     <div onClick={ () => navigate( '/users', AdminLayout ) }>USERS</div>
                  </li>
               </ul>
            </nav>
         </div>
         <Suspense fallback={ <div>Loading...</div> }>
            { React.createElement( layoutComponent, {}, children ) }
         </Suspense>
      </>
   );
};