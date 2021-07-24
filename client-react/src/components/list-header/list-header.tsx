import React, { HTMLAttributes, useMemo } from 'react';
import styles from './styles.module.css';


interface IListHeaderProps extends HTMLAttributes<HTMLDivElement> { };
export const ListHeader = ( { className }: IListHeaderProps ) => {
   const hostClasses = useMemo( () => [ styles.host, className ].join( ' ' ), [ className ] );

   return <div className={ hostClasses }>LIST HEADER</div>;
};