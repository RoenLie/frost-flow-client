import { useScrollAware } from "./useScrollAware";
import React, { CSSProperties, memo, useEffect, useMemo, useState } from "react";
import styles from './styles.module.css';
import { useScrollContainer } from "features/virtual-scroll";



export interface IVirtualScrollProps {
   itemCount: number;
   defaultColDefs: any;
   colDefs: any[];
   rowData: any[];
   childHeight: number;
   renderAhead?: number;
   dataTrigger: ( start: number ) => { subscribe: any; } | any;
}


const VirtualScroll = ( {
   defaultColDefs,
   colDefs,
   rowData,
   childHeight,
   renderAhead = 20,
   dataTrigger
}: IVirtualScrollProps
) => {
   //#region custom hooks
   const [ $scrollTop, $scrollLeft, $scrollDirection, ref ] = useScrollAware();
   const [ $rowWrapperHeight, rowWrapperRef ] = useScrollContainer( {} );
   //#endregion

   //#region local classes/functions
   const fieldResizeEvents = {
      field: '',
      element: null as HTMLElement | null,
      subscriptions: [] as Array<[ keyof WindowEventMap, any ]>,
      getRects() { return this.element?.getBoundingClientRect(); },
      mousedown( e: MouseEvent, field: string ) {
         const target = e.target as HTMLElement;
         this.element = target.parentElement?.parentElement as HTMLElement;
         this.field = field;
         this.subscribe();
      },
      mouseup() {
         this.unsubscribe();
      },
      mousemove( e: MouseEvent ) {
         if ( e.buttons !== 1 ) this.unsubscribe();
         e.preventDefault();

         requestAnimationFrame( () => {
            const rects = this.getRects();
            if ( !rects ) return;

            const colDef = $customColDefs[ this.field ];
            const width = e.x - rects.left;

            setCustomColDefs( {
               ...$customColDefs,
               [ this.field ]: { ...colDef, width }
            } );
         } );
      },
      subscribe() {
         this.subscriptions.push( [ 'mousemove', this.mousemove.bind( this ) ] );
         this.subscriptions.push( [ 'mouseup', this.mouseup.bind( this ) ] );

         this.subscriptions.forEach( ( sub ) => addEventListener( sub[ 0 ], sub[ 1 ] ) );
      },
      unsubscribe() {
         this.subscriptions.forEach( ( sub ) => removeEventListener( sub[ 0 ], sub[ 1 ] ) );
      }
   };
   //#endregion

   //#region internal state
   const [ $customColDefs, setCustomColDefs ]: [ any, Function ] = useState();
   //#endregion

   //#region local variables
   const totalHeight = rowData.length * childHeight;
   const startNode = Math.max( 0, Math.floor( $scrollTop / childHeight ) - renderAhead );
   const visibleNodeCount = Math.min( rowData.length - startNode, Math.ceil( $rowWrapperHeight / childHeight ) + 2 + renderAhead );
   const offsetY = startNode * childHeight;
   //#endregion

   //#region useEffect
   useEffect( () => {
      setCustomColDefs( colDefs.reduce( ( acc, def ) => {
         const width = def.width || def.minWidth || defaultColDefs.minWidth || 100;
         acc[ def.field ] = { ...defaultColDefs, ...def, width };
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
      if ( !$customColDefs ) return;

      const merged = colDefs.map( def => ( { ...defaultColDefs, ...def, ...$customColDefs[ def.field ] } ) );
      return merged;
   }, [ colDefs, defaultColDefs, $customColDefs ] );

   const visibleHeaders = useMemo( () => {
      if ( !mergedDefs ) return ( <></> );

      return mergedDefs
         .filter( def => !def.hidden )
         .map( def => {
            const style = {
               width: def.width || def.minWidth,
               minWidth: def.minWidth,
            } as CSSProperties;


            return (
               <div key={ def.field } style={ style } className={ styles.headerField }>
                  <div>{ def.label || def.field }</div>
                  <div onMouseDown={ ( e ) => fieldResizeEvents.mousedown( e as unknown as MouseEvent, def.field ) }
                     className={ styles.columnResizer }><span /></div>
               </div> );
         } );
   }, [ mergedDefs ] );

   const visibleRows = useMemo( () => {
      if ( !mergedDefs ) return ( <></> );

      return new Array( visibleNodeCount )
         .fill( null )
         .map( ( _, index ) => {
            const rowStyle = {
               height: childHeight,
               width: '100%',
               willChange: 'width',
               display: 'flex',
               flexFlow: 'row nowrap',
               alignItems: 'center',
            } as CSSProperties;

            return (
               <div key={ index + startNode } className={ styles.listRow } style={ rowStyle }>
                  { mergedDefs.filter( def => !def.hidden ).map( ( def, i ) => {
                     const fieldStyle = {
                        width: def.width || def.minWidth,
                        minWidth: def.minWidth,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis'
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
      height: $rowWrapperHeight,
   } as CSSProperties ), [ $rowWrapperHeight ] );

   const viewportStyle = useMemo( () => ( {
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