import React from 'react';
import styles from './styles.module.css';


export default ( { children }: any ) => {
   return (
      <>
         <section className={ styles.header }>
            <div className={ styles.test }>ADMIN LAYOUT</div>
         </section>
         <div>
            { children }
         </div>
      </>
   );
};