import React from 'react';
import { SvgIcon } from "features";
import { Link } from "react-router-dom";


export const HomePage = () => {
   return <>
      <h2>Home</h2>
      <Link to="/about">
         <SvgIcon size="medium" svgName='frostbite-logo' />
      </Link>
   </>;
};