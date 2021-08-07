import { SvgIcon } from "features";
import React from 'react';


export const NotFound = () => {
   const styles = {
      'display': 'grid',
      'placeItems': 'center',
      'height': '100%'
   };

   return (
      <div style={ styles }>
         <SvgIcon svgName="not-found" width="30rem"></SvgIcon>
      </div>
   );
};