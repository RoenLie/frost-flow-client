import React from 'react';
import ReactDOM from 'react-dom';
import { App } from 'core';
import './main.css';
import { svgIconService } from 'core/svg';


svgIconService.svgs = {
   frostbite_logo: React.lazy( () => import( 'assets/frostbite_logo.svg?component' ) )
};


ReactDOM.render(
   <React.StrictMode>
      <App />
   </React.StrictMode>,
   document.getElementById( 'root' )
);
