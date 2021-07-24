import React, { HTMLAttributes, useMemo } from 'react';
import styles from './styles.module.css';


export interface IListTabProps extends HTMLAttributes<HTMLElement> { label?: string; };
export const ListTab = ( { className, label }: IListTabProps ) => {
   const hostClasses = useMemo( () => [ styles.host, className ].join( ' ' ), [ className ] );

   return <div className={ hostClasses }>{ label }</div>;
};