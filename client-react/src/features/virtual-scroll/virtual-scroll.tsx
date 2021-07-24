import { useScrollAware } from "./useScrollAware";
import React, { memo, useMemo } from "react";
import styles from './styles.module.css';
import { any } from "prop-types";


export interface IVirtualScrollProps {
   Item: any;
   itemCount: number;
   height: number;
   childHeight: number;
   renderAhead?: number;
}
// VirtualScroll component
const VirtualScroll = ( {
   Item,
   itemCount,
   height,
   childHeight,
   renderAhead = 20
}: IVirtualScrollProps ) => {
   const [ scrollTop, ref ] = useScrollAware() as [ number, any ];
   const totalHeight = itemCount * childHeight;

   const hostStyle = useMemo( () => ( { height, overflow: 'auto' } ), [ height ] );
   const viewportStyle = useMemo( () => ( { height: totalHeight } ), [ itemCount, childHeight ] );

   let startNode = Math.floor( scrollTop as number / childHeight ) - renderAhead;
   startNode = Math.max( 0, startNode );

   let visibleNodeCount = Math.ceil( height / childHeight ) + 2 * renderAhead;
   visibleNodeCount = Math.min( itemCount - startNode, visibleNodeCount );

   const offsetY = startNode * childHeight;

   const visibleChildren = useMemo( () =>
      new Array( visibleNodeCount )
         .fill( null )
         .map( ( _, index ) => <Item key={ index + startNode } index={ index + startNode } /> )
      ,
      [ startNode, visibleNodeCount, Item ]
   );


   return (
      <div className={ styles.host } style={ hostStyle } ref={ ref } >
         <div className="viewport" style={ viewportStyle } >
            <div style={ { willChange: "transform", transform: `translateY(${ offsetY }px)` } } >
               { visibleChildren }
            </div>
         </div>
      </div>
   );
};


export const MemoVirtualScroll = memo( VirtualScroll );
