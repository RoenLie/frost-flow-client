import React from 'react';
import { SvgIcon } from "core";
import { Link } from "react-router-dom";
import { iocTest1, iocTest2 } from "shared"; $: 'ioc';


console.clear();
iocTest1();
iocTest2();


export const HomePage = () => {
   return <>
      <h2>Home</h2>
      <Link to="/about">
         <SvgIcon size="medium" svgName='frostbite_logo' />
      </Link>
   </>;
};