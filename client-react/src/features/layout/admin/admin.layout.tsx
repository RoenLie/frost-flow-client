import React from 'react';


export default ( { children }: any ) => {
   return (
      <>
         <header>Admin layout</header>
         <div>
            { children }
         </div>
      </>
   );
};