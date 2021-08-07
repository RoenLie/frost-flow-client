import React, {
   CSSProperties, memo,
   useEffect, useMemo, useRef
} from "react";
import styles from './styles.module.css';
import { SvgIcon } from "features";
import { VirtualScrollApi } from "features/virtual-scroll/VirtualListGridApi";
import { useForceUpdate } from "hooks";


interface IVirtualScrollProps { api: VirtualScrollApi; }
const VirtualScroll = ( { api }: IVirtualScrollProps
) => {
   const forceUpdate = useForceUpdate();
   api.rerender = forceUpdate;

   const { listApi, columnApi, styleApi } = api;
   const { moveColumnApi, resizeColumnApi, columnMenuApi } = api.columnApi;
   const { scrollApi, listWrapperApi } = api.listApi;
   const { viewportWrapperStyle, viewportStyle,
      viewMoverStyle, listHeaderStyle } = styleApi;


   /* 
      Creates ref to the list wrapper and subscribes to
      window resize to keep the size correct as the window is resized.
   */
   const rowWrapperRef = useRef<HTMLDivElement>( null );
   useEffect( () => {
      listWrapperApi.element = rowWrapperRef.current;
      listWrapperApi.subscribe();
      listWrapperApi.calcWrapperHeight();

      return () => listWrapperApi.unsubscribe();
   }, [ rowWrapperRef.current ] );


   /*
      Creates a ref to the viewport wrapper and subscribes to
      the scroll api that updates the view when scrolling occurs.
   */
   const viewportWrapperRef = useRef<HTMLDivElement>( null );
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
      if ( !columnMenuApi.open ) return <></>;

      return (
         <div id="fieldHeader-menu"
            className={ styles.headerMenuWrapper } style={ styleApi.headerMenuStyle }
         >
            <div className={ styles.menu }>
               <div className={ styles.fieldList }>

                  { columnApi.colDefs.merged.map( ( def, i ) => (
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
         </div>
      );
   }, [ columnMenuApi.open, columnApi.colDefs.merged ] );


   /* 
      Creates the label shown when dragging column.
   */
   const columnGhost = useMemo( () => {
      if ( !moveColumnApi.moving ) return <></>;

      return (
         <div className={ styles.columnGhost }
            style={ styleApi.columnGhostStyle }
         >
            <div className={ styles.label }>
               { moveColumnApi.label }
            </div>
         </div>
      );
   }, [ moveColumnApi.moving, moveColumnApi.offset ] );


   /* 
      Create the column elements based on the merged
      column definitions.
    */
   const visibleHeaders = useMemo( () => {
      if ( !columnApi.colDefs.merged.length ) return <></>;

      return columnApi.colDefs.merged
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
                  {/* check all rows */ }
                  { def.checkbox
                     ? <div>
                        <input type="checkbox"
                           onChange={ listApi.checkAllRows.bind( listApi ) }
                           checked={ listApi.allRowsChecked }
                        />
                     </div>
                     : null }

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
                           <SvgIcon svgName="chevron-up-solid" size="small" />
                        </div>
                        : def.sort == 'desc'
                           ? <div className={ styles.columnSort }
                              onMouseUp={ ( e ) => listApi.sortRows( def.field ) }>
                              <SvgIcon svgName="chevron-down-solid" size="small" />
                           </div>
                           : null }

                     { def.menu !== false
                        ? <div className={ styles.columnMenu }
                           onClick={ ( e ) => columnMenuApi.openMenu( e as any ) }>
                           <SvgIcon svgName="bars-solid" size="small" />
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
   }, [ columnApi.colDefs.merged, listApi.allRowsChecked ] );


   /* 
      Create the row elements based on merged column definitions,
      start node and visible node count.
   */
   const ListRow = ( { rowIndex }: { rowIndex: number; } ) => {
      const rowStyle = {
         height: listApi.childHeight,
      } as CSSProperties;

      const rowClasses: any[] = [ styles.listRow ];

      listApi.checkedRows[ rowIndex ]
         ? rowClasses.push( styles.checked )
         : null;

      rowIndex % 2 == 1
         ? rowClasses.push( styles.even )
         : rowClasses.push( styles.odd );

      return (
         <div style={ rowStyle } className={ rowClasses.join( ' ' ) }>
            { columnApi.colDefs.merged
               .filter( def => !def.hidden )
               .map( ( def, i ) =>
                  <ListRowField key={ rowIndex + i } def={ def } rowIndex={ rowIndex } /> ) }
         </div> );
   };

   const ListRowField = ( { def, rowIndex }: any ) => {
      const fieldStyle = {
         willChange: 'width',
         width: def.width || def.minWidth,
         minWidth: def.minWidth,
      } as CSSProperties;

      return (
         <div className={ styles.rowField } style={ fieldStyle }>
            {/* checkbox area */ }
            { def.checkbox
               ? <div className={ styles.checkbox }>
                  <input type="checkbox"
                     onChange={ () => listApi.checkRow( rowIndex ) }
                     checked={ listApi.checkedRows[ rowIndex ] }
                  />
               </div>
               : <></> }

            {/* icon area */ }
            { def.actions?.length
               ? <div className={ styles.icons }>
                  { def.actions.map( ( ac: any ) => (
                     <SvgIcon svgName={ ac.icon } size="small"
                        onClick={ ac.onClick }
                        key={ ac.icon } />
                  ) ) }
               </div>
               : <></> }

            {/* field text*/ }
            <div className={ styles.fieldText }>
               { listApi.rowData[ rowIndex ]?.[ def.field ] }
            </div>
         </div>
      );
   };

   const visibleRows = useMemo( () => {
      if ( !listApi.rowCount || !listApi.visibleNodeCount ) return <></>;

      return new Array( listApi.visibleNodeCount )
         .fill( null )
         .map( ( _, index ) => {
            const rowIndex = index + listApi.startNode;
            return ( <ListRow key={ rowIndex } rowIndex={ rowIndex } /> );
         } );
   }, [
      listApi.startNode,
      listApi.visibleNodeCount,
      listApi.checkedRows,
      listApi.allRowsChecked,
      columnApi.colDefs.merged,
   ] );


   return (
      <div className={ styles.host } data-name="virtualscroll">
         <div className={ styles.wrapper }>

            {/* Wrapper for header */ }
            <div className={ styles.listHeaderWrapper }>
               <div className={ styles.listHeader } style={ listHeaderStyle }>
                  { visibleHeaders }
               </div>
            </div>

            { /* Wrapper that is used to find the correct size for the list */ }
            <div className={ styles.listRowWrapper } ref={ rowWrapperRef }>
               <div className={ styles.viewportWrapper } style={ viewportWrapperStyle as any }
                  ref={ viewportWrapperRef }
               >
                  <div className={ styles.viewport } style={ viewportStyle }>
                     <div className={ styles.viewMover } style={ viewMoverStyle }
                        data-name="viewmover"
                     >
                        { visibleRows }
                     </div>
                  </div>
               </div>
            </div>

            { headerMenu }
            { columnGhost }

         </div>
      </div>
   );
};


export const MemoVirtualScroll = memo( VirtualScroll );