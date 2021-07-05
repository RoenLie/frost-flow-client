import React from 'react';


export default ( { children }: any ) => {
   return (
      <>
         <header>Default layout</header>
         <div>
            { children }
         </div>
      </>
   );
};