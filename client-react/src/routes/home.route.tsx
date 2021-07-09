import React from 'react';
import { SvgIcon } from "core";
import { Link } from "react-router-dom";


export default () => {
   return <>
      <h2>Home</h2>
      <Link to="/about">
         <SvgIcon size="medium" svgName='frostbite_logo' />
      </Link>
   </>;
};