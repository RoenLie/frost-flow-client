import { SvgIcon } from "core";
import React from 'react';


export const NotFound = () => {
   const styles = {
      'display': 'grid',
      'placeItems': 'center',
      'height': '100%'
   };

   return (
      <div style={ styles }>
         <SvgIcon svgName="not_found" width="20rem"></SvgIcon>
      </div>
   );
};