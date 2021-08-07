import React from "react";

export const BasicRecordForm = ( { record } ) => {
   console.log( 'BasicRecordForm rendered' );

   return (
      <div>
         <pre>
            { JSON.stringify( record, null, '\t' ) }
         </pre>
      </div>
   );
};