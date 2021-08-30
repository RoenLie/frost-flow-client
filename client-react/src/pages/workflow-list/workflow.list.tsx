import { cargoLoader2 } from "features/inversify/APP/CORE/features/cargoLoader-v2";
import { IDocumentService } from "features/inversify/APP/CORE/modules/core.document.module";
import React from 'react';


export const WorkflowList = ( { routes }: any ) => {

   const [ cargo ] = cargoLoader2( [ 'document' ], 'SYS', {} );
   console.log( cargo );
   const documentService = cargo.get<IDocumentService>( IDocumentService );

   return (
      <div>
         WORKFLOW LIST
         <h1>{ documentService.documentTitle }</h1>
      </div>
   );
};