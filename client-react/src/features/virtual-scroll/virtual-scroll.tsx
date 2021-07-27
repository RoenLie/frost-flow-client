import { useScrollAware } from "./useScrollAware";
import React, { CSSProperties, Dispatch, memo, useEffect, useMemo, useState } from "react";
import styles from './styles.module.css';
import { useScrollContainer } from "features/virtual-scroll";
import { useMoveColumn } from "features/virtual-scroll/useColumnMove";
import { useResizeColumn } from "features/virtual-scroll/useResizeColumn";



export interface IVirtualScrollProps {
   itemCount: number;
   defaultColDefs: any;
   colDefs: any[];
   rowData: any[];
   childHeight: number;
   renderAhead?: number;
   dataTrigger: ( start: number ) => { subscribe: any; } | any;
   onMoveColumnEnd?: ( colDefs: any[] ) => void;
   onResizeColumnEnd?: ( colDefs: any[] ) => void;
}


const VirtualScroll = ( {
   defaultColDefs,
   colDefs,
   rowData,
   childHeight,
   renderAhead = 5,
   dataTrigger,
   onMoveColumnEnd,
   onResizeColumnEnd
}: IVirtualScrollProps
) => {
   //#region internal state
   const [ $customColDefs, setCustomColDefs ]: [ any, Dispatch<any> ] = useState();
   //#endregion


   //#region custom hooks
   const [ $scrollTop, $scrollLeft, $scrollDirection, ref ] = useScrollAware();
   const [ $rowWrapperHeight, rowWrapperRef ] = useScrollContainer( {} );
   //#endregion


   //#region local variables
   const totalHeight = rowData.length * childHeight;
   const startNode = Math.max( 0, Math.floor( $scrollTop / childHeight ) - renderAhead );
   const visibleNodeCount = Math.min( rowData.length - startNode, Math.ceil( $rowWrapperHeight / childHeight ) + 2 + renderAhead );
   const offsetY = startNode * childHeight;
   //#endregion


   //#region useEffect
   useEffect( () => {
      setCustomColDefs( colDefs.reduce( ( acc, def, index ) => {
         const width = def.width || def.minWidth || defaultColDefs.minWidth || 100;
         const order = index;
         acc[ def.field ] = { ...defaultColDefs, ...def, width, order };
         return acc;
      }, {} ) );
   }, [] );

   /*
   Performs initial data request, subscribes to api and repeats request
   untill the dataset contains the same amount of rows as 
   can be shown in one screen or all items from the
   database have been returned
   */
   useEffect( () => {
      if ( rowData.length > 0 || $rowWrapperHeight === 0 ) return;

      const pub = dataTrigger( 0 );
      const sub = pub.subscribe( ( querying: boolean, rowCount: number ) => {
         if ( querying ) return;
         const availableHeight = $rowWrapperHeight / childHeight;
         if ( rowCount < availableHeight ) dataTrigger( rowCount );
         else sub();
      } );

      return () => sub();
   }, [ $rowWrapperHeight ] );
   //#endregion


   //#region useMemo
   const mergedDefs = useMemo( () => {
      if ( !$customColDefs ) return [];

      const merged = colDefs.map( ( def, i ) => {
         return { ...defaultColDefs, ...def, ...$customColDefs[ def.field ] };
      } ).sort( ( a, b ) => a.order - b.order );

      return merged;
   }, [ colDefs, defaultColDefs, $customColDefs ] );


   //#region custom event hooks
   const { columnResizeEvents, $triggerResizeColumnEnd } = useResizeColumn( $customColDefs, setCustomColDefs );
   const {
      columnMoveEvents,
      $columnMouseenterEvent,
      $triggerMoveColumnEnd
   } = useMoveColumn( $customColDefs, setCustomColDefs );

   useEffect( () => {
      if ( $triggerMoveColumnEnd === 0 && $triggerResizeColumnEnd === 0 ) return;
      onResizeColumnEnd?.( mergedDefs );
   }, [ $triggerMoveColumnEnd, $triggerResizeColumnEnd ] );


   //#endregion


   const visibleHeaders = useMemo( () => {
      if ( !mergedDefs ) return ( <></> );

      return mergedDefs
         .filter( def => !def.hidden )
         .map( ( def, i ) => {
            const fieldId = 'fieldHeader-' + def.field;

            const style = {
               willChange: 'width',
               width: def.width || def.minWidth,
               minWidth: def.minWidth,
            } as CSSProperties;

            const labelStyle = {
               position: 'relative',
               display: 'grid',
               placeItems: 'center'
            } as CSSProperties;

            const moveStyle = {
               position: 'absolute',
               width: '100%',
               height: '100%',
               zIndex: 1,
               cursor: 'grab'
            } as CSSProperties;

            return (
               <div
                  key={ def.field }
                  id={ fieldId }
                  style={ style }
                  className={ styles.headerField }
                  onMouseEnter={ ( e ) => $columnMouseenterEvent.mouseenter( e as unknown as MouseEvent, def.moveable, def.field ) }
               >
                  <div style={ labelStyle }>
                     <span>{ def.label || def.field }</span>
                     <span style={ moveStyle }
                        onMouseDown={ ( e ) => columnMoveEvents.mousedown( e as unknown as MouseEvent, def.field, fieldId ) }
                     />
                  </div>

                  <div className={ styles.columnResizer }>{ def.resizable !== false
                     ? <span onMouseDown={ ( e ) => columnResizeEvents
                        .mousedown( e as unknown as MouseEvent, def.field ) } />
                     : <></> }
                  </div>
               </div>
            );
         } );
   }, [ mergedDefs ] );

   const visibleRows = useMemo( () => {
      if ( !mergedDefs ) return ( <></> );

      return new Array( visibleNodeCount )
         .fill( null )
         .map( ( _, index ) => {
            const rowStyle = {
               height: childHeight,
               willChange: 'width',
               display: 'flex',
               flexFlow: 'row nowrap',
               alignItems: 'center',
            } as CSSProperties;

            return (
               <div key={ index + startNode } className={ styles.listRow } style={ rowStyle }>
                  { mergedDefs.filter( def => !def.hidden ).map( ( def, i ) => {
                     const fieldStyle = {
                        willChange: 'width',
                        width: def.width || def.minWidth,
                        minWidth: def.minWidth,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                     } as CSSProperties;

                     return (
                        <div key={ i + startNode } style={ fieldStyle }>
                           { rowData[ index + startNode ][ def.field ] }
                        </div>
                     );
                  } ) }
               </div> );
         } );
   }, [ startNode, visibleNodeCount, mergedDefs ] );

   /* 
      Refreshes on scroll and triggers the data request when
      reaching the desired bottom trigger location
   */
   useMemo( () => {
      const el = ref.current as HTMLDivElement;
      const bottomTrigger = Math.ceil( el?.offsetHeight + $scrollTop + ( el?.offsetHeight / 4 ) );
      if ( bottomTrigger > el?.scrollHeight && $scrollDirection > 0 ) dataTrigger( rowData.length );
   }, [ $scrollTop ] );

   const viewportWrapperStyle = useMemo( () => ( {
      willChange: 'height',
      height: $rowWrapperHeight,
   } as CSSProperties ), [ $rowWrapperHeight ] );

   const viewportStyle = useMemo( () => ( {
      willChange: 'height',
      height: totalHeight,
   } as CSSProperties ), [ totalHeight ] );

   const viewMoverStyle = useMemo( () => ( {
      willChange: 'transform',
      transform: `translateY(${ offsetY }px)`,
   } as CSSProperties ), [ offsetY ] );

   const listHeaderStyle = useMemo( () => ( {
      willChange: 'transform',
      transform: `translateX(${ -$scrollLeft }px)`,
   } as CSSProperties ), [ $scrollLeft ] );
   //#endregion


   return (
      <div className={ styles.host }>

         {/* Wrapper for header */ }
         <div className={ styles.listHeaderWrapper }>
            <div className={ styles.listHeader } style={ listHeaderStyle }>
               { visibleHeaders }
            </div>
         </div>

         { /* Wrapper that is used to find the correct size for the list */ }
         <div className={ styles.listRowWrapper } ref={ rowWrapperRef }>
            <div className={ styles.viewportWrapper } style={ viewportWrapperStyle } ref={ ref }>
               <div className={ styles.viewport } style={ viewportStyle }>
                  <div className={ styles.viewMover } style={ viewMoverStyle }>
                     { visibleRows }
                  </div>
               </div>
            </div>
         </div>

      </div>
   );
};


export const MemoVirtualScroll = memo( VirtualScroll );