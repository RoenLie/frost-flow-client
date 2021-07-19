import React, { Suspense } from 'react';
import { Link, useLocation } from "react-router-dom";
import { SvgIcon } from "core";
import { routes } from "routes/routes";
import styles from './styles.module.css';
import { rootModalService } from "features/modal/modal.service";
import { rootToastService } from "features/toast/toast.service";
import { Modal, ModalPortal } from "features/modal";
import { ToastPortal } from "features/toast";


export default ( { children }: any ) => {
   const location = useLocation();

   const getFirstPath = ( path: string ) => path.split( '/' ).filter( Boolean )[ 0 ];
   const toFirstChildRoute = ( route: any ) => route.routes ? route.routes[ 0 ].path : route.path;

   const firstPath = getFirstPath( location.pathname );


   return ( <>
      <div className={ styles.main }>

         <div className={ styles.header }>
            <div className={ styles.headerLeftNav }></div>

            <div className={ styles.headerCenterNav }>
               { routes
                  .filter( r => r.label )
                  .map( ( route: any, i: number ) => (

                     <Link key={ i } to={ toFirstChildRoute( route ) } title={ route.label }>
                        <div className={ firstPath == getFirstPath( route.path ) ? styles.active : '' }>
                           { route.label }
                        </div>
                     </Link>

                  ) ) }
            </div>

            <div className={ styles.headerRightNav }
               onClick={ () => { rootModalService.addModal( Modal ); } }
            >
               <div><SvgIcon svgName="user_solid" /></div>
            </div>
         </div>


         <section className={ styles.content }>
            <Suspense fallback={ <div>⟳</div> }>
               { children }
            </Suspense>
         </section>

      </div >

      <ModalPortal serviceProvider={ rootModalService }></ModalPortal>
      <ToastPortal serviceProvider={ rootToastService }></ToastPortal>
   </> );
};