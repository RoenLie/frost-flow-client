import { IListTabProps } from "components/list-tab";
import { ListTab } from "components/list-tab";
import React, { HTMLAttributes, useMemo } from 'react';
import { uuid } from "shared";
import styles from './styles.module.css';


export interface IListTabsProps extends HTMLAttributes<HTMLDivElement> { tabs: IListTabProps[]; };
export const ListTabs = ( { className, tabs }: IListTabsProps ) => {
   const hostClasses = useMemo( () => [ styles.host, className ].join( ' ' ), [ className ] );

   return (
      <div className={ hostClasses }>
         { tabs.map( tab => <ListTab key={ uuid() } label={ tab.label } /> ) }
      </div>
   );
};