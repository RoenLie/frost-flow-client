import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useQuery } from "hooks/useQuery";
import { useView } from "hooks/useView";
import { useAxios } from "hooks/useAxios";
import { env } from "env/env";
import { IView } from "hooks/types";
import { useHistory } from "react-router-dom";
import { ViewDesigner } from "components/view-designer";
import { Loader } from "features/loader";
import { rootToastService } from "features/toast";


export const EpochSettings = () => {
   const query = useQuery();
   const history = useHistory();

   const tables = [ 'olympic_winners' ];
   const [ activeTable, setActiveTable ] = useState( query.get( 'table' ) || tables[ 0 ] );
   const [ activeView, setActiveView ] = useState( query.get( 'view' ) || 'default' );
   const [ loading, setLoading ] = useState( false );

   const {
      view,
      loading: viewLoading,
      forceReload: forceReloadView
   } = useView( activeTable, activeView );

   const allViews = useAxios<PostgresResult<IView>>( {
      baseUrl: env.epochHost,
      params: { url: '/postgres/view' }
   } );

   useEffect( () => {
      const queryParams: any[] = [];
      activeTable && queryParams.push( 'table=' + activeTable );
      activeView && queryParams.push( 'view=' + activeView );

      history.push( {
         pathname: '/epoch/settings',
         search: '?' + queryParams.join( '&' )
      } );
   }, [ activeTable, activeView ] );

   const save = async ( promise: Promise<any> ) => {
      setLoading( true );
      await promise;
      setLoading( false );
      forceReloadView();

      rootToastService.addMessage( {
         mode: 'success',
         message: 'view has been saved successfully',
         autoClose: true,
         autoCloseTime: 2000
      } );
   };


   return (
      <div className={ styles.content }>
         <div className={ styles.viewSelectorContainer }>
            <div>
               <label htmlFor="tables">Table selector</label>
               <select name="view_tables" id="view_tables">
                  { tables.map( ( table, i ) =>
                     <option key={ i } value={ table }>
                        { table }
                     </option> ) }
               </select>
            </div>
            <div>
               { !allViews.loading
                  ? allViews.response?.data
                     .filter( v => v.table_name == activeTable )
                     .map( view => {
                        return (
                           <div key={ view.sys_id }
                              onClick={ () => setActiveView( view.name ) }
                           >
                              { view.name }
                           </div>
                        );
                     } )
                  : '' }
            </div>
         </div >
         <div className={ styles.viewDesignerContainer }>
            <Loader loading={ viewLoading || loading }>
               <ViewDesigner
                  view={ view }
                  onSave={ save }
               />
            </Loader>
         </div>
      </div >
   );
};

