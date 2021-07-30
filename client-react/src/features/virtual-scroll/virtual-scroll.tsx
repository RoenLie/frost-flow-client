import React, {
   CSSProperties, memo,
   useEffect, useMemo, useRef, useState
} from "react";
import styles from './styles.module.css';
import { useScrollContainer } from "features/virtual-scroll";
import { SvgIcon } from "core";
import { VirtualScrollApi } from "features/virtual-scroll/VirtualListGridApi";
import { useForceUpdate } from "hooks";


export interface IVirtualScrollProps {
   api: VirtualScrollApi;
}

const VirtualScroll = ( { api }: IVirtualScrollProps
) => {
   //#region state
   const forceUpdate = useForceUpdate();
   const [ $headerMenu, setHeaderMenu ] = useState( { open: false, xy: [ 150, 150 ] } );
   const [ $rowWrapperHeight, rowWrapperRef ] = useScrollContainer( {} );
   //#endregion


   //#region local variables
   const { listApi, columnApi } = api;
   const { moveColumnApi } = api.columnApi;
   const { resizeColumnApi } = api.columnApi;
   const { scrollApi } = api.listApi;

   api.rerender = forceUpdate;

   listApi.wrapperHeight = $rowWrapperHeight;
   //#endregion

   const openHeaderMenu = ( e: MouseEvent ) => {
      setHeaderMenu( { open: true, xy: [ e.clientX - 15, e.clientY - 15 ] } );
      addEventListener( 'mousedown', closeHeaderMenu );
   };

   const closeHeaderMenu = ( e: MouseEvent ) => {
      const insideMenu = e.composedPath()
         .some( ( path: any ) => path.id == 'fieldHeader-menu' );

      if ( insideMenu ) return;

      setHeaderMenu( { open: false, xy: [ 0, 0 ] } );
      removeEventListener( 'mousedown', closeHeaderMenu );
   };




   /*
      Creates a ref to the viewport wrapper and subscribes to
      the scroll api that updates the view when scrolling occurs.
   */
   const viewportWrapperRef = useRef<HTMLElement>( null ) as React.RefObject<HTMLDivElement>;
   useEffect( () => {
      scrollApi.element = viewportWrapperRef.current;
      scrollApi.subscribe();
      return () => scrollApi.unsubscribe();
   }, [ viewportWrapperRef.current ] );


   /* 
      Creates header menu element based on headermenu
      open state and merged column defs
   */
   const headerMenu = useMemo( () => {
      const wrapperStyle = {
         left: $headerMenu.xy[ 0 ],
         top: $headerMenu.xy[ 1 ],
      } as CSSProperties;

      return ( <> { $headerMenu.open
         ? (
            <div id="fieldHeader-menu"
               className={ styles.headerMenuWrapper } style={ wrapperStyle }
            >
               <div className={ styles.menu }>
                  <div className={ styles.fieldList }>

                     { listApi.colDefs.merged.map( ( def, i ) => (
                        <div key={ def.field } className={ styles.field }>
                           <input id={ def.field + i }
                              type="checkbox"
                              disabled={ i == 0 }
                              checked={ !def.hidden }
                              onChange={ () => columnApi.toggleColumn( def.field ) }
                           />
                           <label htmlFor={ def.field + i } >{ def.label }</label>
                        </div>
                     ) ) }

                  </div>
               </div>
            </div> )
         : null }
      </> );
   }, [ $headerMenu.open, listApi.colDefs.merged ] );


   /* 
      Create the column elements based on the merged
      column definitions.
    */
   const visibleHeaders = useMemo( () => {
      if ( !listApi.colDefs.merged.length ) return <></>;

      return listApi.colDefs.merged
         .filter( def => !def.hidden )
         .map( ( def ) => {
            const fieldId = 'fieldHeader-' + def.field;
            const columnStyle = {
               willChange: 'width',
               width: def.width || def.minWidth,
               minWidth: def.minWidth,
            } as CSSProperties;

            return (
               <div
                  key={ def.field }
                  id={ fieldId }
                  style={ columnStyle }
                  className={ styles.headerField }
                  onMouseEnter={ ( e ) =>
                     moveColumnApi.mouseenter( e as any, def.field ) }
               >
                  {/* custom header field renderers go here */ }
                  <div></div>

                  {/* header field text and functionality */ }
                  <div className={ styles.headerFieldLabel }>
                     { def.label
                        ? <span>{ def.label || def.field }</span>
                        : null }

                     <span className={ styles.columnMover }
                        onMouseDown={ ( e ) =>
                           moveColumnApi.mousedown( e as any, def.field, fieldId ) }
                        onMouseUp={ ( e ) => listApi.sortRows( def.field ) } />
                  </div>

                  {/* header field menu area */ }
                  <div className={ styles.columnMenuWrapper }>
                     { def.sort == 'asc'
                        ? <div className={ styles.columnSort }
                           onMouseUp={ ( e ) => listApi.sortRows( def.field ) }>
                           <SvgIcon svgName="chevron_up_solid" size="small" />
                        </div>
                        : def.sort == 'desc'
                           ? <div className={ styles.columnSort }
                              onMouseUp={ ( e ) => listApi.sortRows( def.field ) }>
                              <SvgIcon svgName="chevron_down_solid" size="small" />
                           </div>
                           : null }

                     { def.menu !== false
                        ? <div className={ styles.columnMenu }
                           onClick={ ( e ) => openHeaderMenu( e as any ) }>
                           <SvgIcon svgName="bars_solid" size="small" />
                        </div>
                        : null }
                  </div>

                  {/* header field resize functionality */ }
                  <div className={ styles.columnResizer }>
                     { def.resizable !== false
                        ? <span onMouseDown={ ( e ) =>
                           resizeColumnApi.mousedown( e as any, def.field ) } />
                        : null }
                  </div>
               </div>
            );
         } );
   }, [ listApi.colDefs.merged ] );


   /* 
      Create the row elements based on merged column definitions,
      start node and visible node count.
   */
   const visibleRows = useMemo( () => {
      if ( !listApi.rowCount ) return <></>;

      return new Array( listApi.visibleNodeCount )
         .fill( null )
         .map( ( _, index ) => {
            const rowStyle = { height: listApi.childHeight } as CSSProperties;

            return (
               <div key={ index + listApi.startNode } className={ styles.listRow } style={ rowStyle }>
                  { listApi.colDefs.merged.filter( def => !def.hidden ).map( ( def, i ) => {
                     const fieldStyle = {
                        willChange: 'width',
                        width: def.width || def.minWidth,
                        minWidth: def.minWidth,
                     } as CSSProperties;

                     return (
                        <div key={ i + listApi.startNode } style={ fieldStyle } className={ styles.rowField }>
                           {/* icons and field renderers go here */ }
                           <div></div>

                           {/* row field text goes here */ }
                           <div>{ listApi.rowData[ index + listApi.startNode ]?.[ def.field ] }</div>
                        </div>
                     );
                  } ) }
               </div> );
         } );
   }, [ listApi.startNode, listApi.visibleNodeCount, listApi.colDefs.merged ] );



   const viewportWrapperStyle = useMemo( () => ( {
      willChange: 'height',
      height: $rowWrapperHeight,
   } as CSSProperties ), [ $rowWrapperHeight ] );

   const viewportStyle = useMemo( () => ( {
      willChange: 'height',
      height: listApi.totalHeight,
   } as CSSProperties ), [ listApi.totalHeight ] );

   const viewMoverStyle = useMemo( () => ( {
      willChange: 'transform',
      transform: `translateY(${ listApi.offsetY }px)`,
   } as CSSProperties ), [ listApi.offsetY ] );

   const listHeaderStyle = useMemo( () => ( {
      willChange: 'transform',
      transform: `translateX(${ -scrollApi.scrollLeft }px)`,
   } as CSSProperties ), [ scrollApi.scrollLeft ] );
   //#endregion


   return (
      <div className={ styles.host }>
         <div className={ styles.wrapper }>

            {/* Wrapper for header */ }
            <div className={ styles.listHeaderWrapper }>
               <div className={ styles.listHeader } style={ listHeaderStyle }>
                  { visibleHeaders }
               </div>
            </div>

            { /* Wrapper that is used to find the correct size for the list */ }
            <div className={ styles.listRowWrapper } ref={ rowWrapperRef }>
               <div className={ styles.viewportWrapper } style={ viewportWrapperStyle } ref={ viewportWrapperRef }>
                  <div className={ styles.viewport } style={ viewportStyle }>
                     <div className={ styles.viewMover } style={ viewMoverStyle }>
                        { visibleRows }
                     </div>
                  </div>
               </div>
            </div>

            { headerMenu }

         </div>
      </div>
   );
};


export const MemoVirtualScroll = memo( VirtualScroll );