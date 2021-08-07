import {
   ListGrid,
   ListHeader,
   ListPreview,
   ListTab,
   ListTabs,
   ListTree,
} from "components";
import React, { HTMLAttributes } from 'react';
import { epochRecordTabService } from "services/epoch-record-tabs.service";
import styles from './styles.module.css';


export interface IEpochListProps extends HTMLAttributes<HTMLElement> { };
export const EpochList = ( { }: IEpochListProps ) => {

   return (
      <section className={ styles.host }>
         <ListTree className={ styles.listSelector } />
         <ListTab className={ styles.listTabsHome } label="HOME" />
         <ListTabs className={ styles.listTabs } tabs={ epochRecordTabService.tabs } />
         <ListHeader className={ styles.listHeader } />
         <ListGrid className={ styles.list } />
         <ListPreview className={ styles.recordPreview } />
      </section>
   );
};

