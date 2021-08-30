import React, { StrictMode } from 'react';
import ReactDOM, { render } from 'react-dom';
import { App } from 'core';
import './main.css';
import 'shared/prototypeExtensions/object';
import 'reflect-metadata'; // used by infersify

// render(
//    <StrictMode>
//       <App />
//    </StrictMode>,
//    document.getElementById( 'root' )
// );

// This is for react 18 which doesn't work with react dom router yet.
const container = document.getElementById( 'root' );
const root = ReactDOM.createRoot( container );
root.render(
   // <React.StrictMode>
   <App />
   // </React.StrictMode>
);