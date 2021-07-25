import { useScrollAware } from "./useScrollAware";
import React, { memo, useEffect, useMemo } from "react";
import styles from './styles.module.css';


export interface IVirtualScrollProps {
   render: React.ComponentType<any>;
   itemCount: number;
   defaultColDefs: any;
   colDefs: any[];
   rowData: any[];
   height: number;
   childHeight: number;
   renderAhead?: number;
   dataTrigger: ( start: number ) => { subscribe: any; } | any;
}


const VirtualScroll = ( {
   render: Item,
   defaultColDefs,
   colDefs,
   rowData,
   height,
   childHeight,
   renderAhead = 20,
   dataTrigger
}: IVirtualScrollProps ) => {
   const [ scrollTop, scrollDirection, ref ] = useScrollAware() as [ number, number, React.RefObject<HTMLDivElement> ];

   const totalHeight = rowData.length * childHeight;
   const startNode = Math.max( 0, Math.floor( scrollTop as number / childHeight ) - renderAhead );
   const visibleNodeCount = Math.min( rowData.length - startNode, Math.ceil( height / childHeight ) + 2 + renderAhead );
   const offsetY = startNode * childHeight;

   const visibleChildren = useMemo( () => {
      return new Array( visibleNodeCount )
         .fill( null )
         .map( ( _, index ) => (
            <div key={ index + startNode } className={ styles.listRow } style={ { height: childHeight } }>
               { colDefs.map( ( def, i ) => (
                  <div key={ i + startNode }>{ rowData[ index + startNode ][ def.field ] }</div>
               ) ) }
            </div>
         ) );
   }, [ startNode, visibleNodeCount, Item ] );

   useEffect( () => {
      if ( rowData.length > 0 || height === 0 ) return;

      const pub = dataTrigger( 0 );
      if ( !pub ) return;

      const sub = pub.subscribe( ( querying: boolean, rowCount: number ) => {
         if ( querying ) return;
         const availableHeight = height / childHeight;
         if ( rowCount < availableHeight ) dataTrigger( rowCount );
         else sub();
      } );

      return () => sub();
   }, [ height ] );

   useMemo( () => {
      const el = ref.current;
      if ( !el ) return;

      const bottomTrigger = Math.ceil( el.offsetHeight + scrollTop + ( el.offsetHeight / 4 ) );
      if ( bottomTrigger > el.scrollHeight && scrollDirection > 0 ) dataTrigger( rowData.length );
   }, [ scrollTop ] );

   const hostStyle = useMemo( () => ( {
      height, overflow: 'auto'
   } ), [ height ] );

   const viewportStyle = useMemo( () => ( {
      overflow: "hidden",
      willChange: "transform",
      height: totalHeight,
      position: "relative"
   } as any ), [ rowData.length, childHeight ] );

   const viewMoverStyle = useMemo( () => ( {
      willChange: "transform", transform: `translateY(${ offsetY }px)`
   } ), [ offsetY ] );

   const columnHeaderStyle = useMemo( () => {
      return {
         minWidth: defaultColDefs.minWidth
      };
   }, [] );


   return (
      <div className={ styles.host } style={ hostStyle } ref={ ref }>

         <div className={ styles.listHeader }>
            { colDefs.map( ( def, i ) => (
               <div key={ i + def.field } style={ columnHeaderStyle }>{ def.field }</div>
            ) ) }
         </div>

         <div style={ viewportStyle }>
            <div style={ viewMoverStyle }>
               { visibleChildren }
            </div>
         </div>

      </div>
   );
};


export const MemoVirtualScroll = memo( VirtualScroll );
