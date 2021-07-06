import React from 'react';
import './default.layout.scss';

export default ( { children }: any ) => {
   return (
      <>
         <section className="header">Default layout</section>
         <div>
            { children }
         </div>
      </>
   );
};