import React from 'react';
import styles from './styles.module.css';


export default ( { children }: any ) => {
   return (
      <div className={ styles.main }>
         <section className={ styles.header }>Default layout</section>
         <div className={ styles.content }>
            { children }
         </div>
      </div>
   );
};