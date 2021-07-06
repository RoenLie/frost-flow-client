import React from 'react';
import './admin.layout.scss';

export default ( { children }: any ) => {
   return (
      <>
         <section className="header">Admin layout</section>
         <div>
            { children }
         </div>
      </>
   );
};