import React, { HTMLAttributes, useMemo } from 'react';
import styles from './styles.module.css';


interface IListPreviewProps extends HTMLAttributes<HTMLDivElement> { };
export const ListPreview = ( { className }: IListPreviewProps ) => {
   const hostClasses = useMemo( () => [ styles.host, className ].join( ' ' ), [ className ] );

   return <div className={ hostClasses }>LIST PREVIEW</div>;
};