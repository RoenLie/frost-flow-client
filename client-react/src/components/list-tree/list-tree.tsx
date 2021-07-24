import React, { HTMLAttributes, useMemo } from "react";
import styles from './styles.module.css';


interface IListTreeProps extends HTMLAttributes<HTMLDivElement> { };
export const ListTree = ( { className }: IListTreeProps ) => {
   const hostClasses = useMemo( () => [ styles.host, className ].join( ' ' ), [ className ] );

   return (
      <div className={ hostClasses }>ListTree</div>
   );

};