import { SvgIcon } from "core";
import { ForwardModalPortal } from "features";
import { Modal } from "features/modal/modal";
import { IModalPortal } from "features/modal/modal-portal";
import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from "react-router-dom";
import { routes } from "routes/routes";
import styles from './styles.module.css';



export default ( { children }: any ) => {
   const location = useLocation();

   const getFirstPath = ( path: string ) => path.split( '/' ).filter( Boolean )[ 0 ];
   const toFirstChildRoute = ( route: any ) => route.routes ? route.routes[ 0 ].path : route.path;

   const firstPath = getFirstPath( location.pathname );

   const modalRef = useRef<IModalPortal>();

   const createModal = () => {
      modalRef.current?.addModal( Modal );
   };

   useEffect( () => {
      createModal();
   }, [] );

   return (
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

            <div className={ styles.headerRightNav } onClick={ createModal }>
               <div><SvgIcon svgName="user_solid" /></div>

            </div>
         </div>

         <section className={ styles.content }>{ children }</section>

         <ForwardModalPortal ref={ modalRef }></ForwardModalPortal>
      </div >
   );
};