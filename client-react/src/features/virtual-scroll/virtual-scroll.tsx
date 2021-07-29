import React, {
   CSSProperties, Dispatch, memo,
   useEffect, useMemo, useState
} from "react";
import { useScrollAware } from "./useScrollAware";
import styles from './styles.module.css';
import { useScrollContainer } from "features/virtual-scroll";
import { useMoveColumn } from "features/virtual-scroll/useColumnMove";
import { useResizeColumn } from "features/virtual-scroll/useResizeColumn";
import { SvgIcon } from "core";
import { VirtualScrollApi } from "features/virtual-scroll/VirtualListGridApi";
import { useForceUpdate } from "hooks";


export interface IVirtualScrollProps {
   api: VirtualScrollApi,
   onMoveColumnEnd?: ( colDefs: any[] ) => void;
   onResizeColumnEnd?: ( colDefs: any[] ) => void;
   onHideColumn?: ( colDefs: any[] ) => void;
   onSortColumn?: ( colDefs: any[] ) => void;
}


const VirtualScroll = ( {
   api,
   onMoveColumnEnd,
   onResizeColumnEnd,
   onHideColumn,
   onSortColumn
}: IVirtualScrollProps
) => {
   // console.log( 'list rendered' );

   //#region state
   const forceUpdate = useForceUpdate();
   // const [ $customColDefs, setCustomColDefs ]: [ any, Dispatch<any> ] = useState();
   const [ $headerMenu, setHeaderMenu ] = useState( { open: false, xy: [ 150, 150 ] } );
   const [ $scrollTop, $scrollLeft, $scrollDirection, ref ] = useScrollAware();
   const [ $rowWrapperHeight, rowWrapperRef ] = useScrollContainer( {} );
   //#endregion


   //#region local variables
   const { listApi } = api;
   api.rerender = forceUpdate;
   listApi.wrapperHeight = $rowWrapperHeight;
   listApi.scrollTop = $scrollTop;


   const { totalHeight, startNode, visibleNodeCount, offsetY } = api.listApi;
   const { defaultColDefs, colDefs, customColDefs } = api.listApi;
   const { rowData } = api.listApi;
   //#endregion


   //#region useEffect
   useEffect( () => {
      const processed = listApi.colDefs.reduce( ( acc, def, index ) => {
         const width = def.width || def.minWidth || defaultColDefs.minWidth || 100;
         const order = index;
         acc[ def.field ] = { ...defaultColDefs, ...def, width, order };
         return acc;
      }, {} );

      listApi.customColDefs = processed;
      api.rerender?.();

      console.log( 'custom col defs set' );


   }, [] );

   /*
      Performs initial data request
   */
   useEffect( () => {
      if ( api.listApi.viewSaturated ) return;
      api.listApi.getRows( { startRow: 0 } );
   }, [ api.listApi.wrapperHeight ] );
   //#endregion


   //#region useMemo
   const mergedDefs = useMemo( () => {
      if ( !listApi.customColDefs ) return [];
      return listApi.mergedColDefs;
   }, [ defaultColDefs, colDefs, customColDefs ] );


   //#region custom event hooks
   const { columnResizeEvents } = useResizeColumn( api );
   const { columnMoveEvents, $columnMouseenterEvent } = useMoveColumn( api );
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

   const toggleField = ( field: string, value: boolean ) => {
      listApi.customColDefs = {
         ...listApi.customColDefs,
         [ field ]: {
            ...listApi.customColDefs[ field ],
            hidden: value ? false : true
         }
      };

      listApi.hideColumnPublisher.publish();
      forceUpdate();
   };

   const HeaderMenu = () => {
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

                     { mergedDefs.map( ( def, i ) => (
                        <div key={ def.field } className={ styles.field }>
                           <input id={ def.field + i }
                              type="checkbox"
                              disabled={ i == 0 }
                              checked={ !def.hidden }
                              onChange={ () => toggleField( def.field, def.hidden ) }
                           />
                           <label htmlFor={ def.field + i } >{ def.label }</label>
                        </div>
                     ) ) }

                  </div>
               </div>
            </div> )
         : null }
      </> );
   };

   const sortColumn = ( field: string ) => {
      if ( $columnMouseenterEvent.dragging ) return;

      const sort = listApi.customColDefs[ field ].sort;
      const newSort = !sort ? 'asc' : sort == 'asc' ? 'desc' : null;

      listApi.customColDefs = {
         ...listApi.customColDefs,
         [ field ]: {
            ...listApi.customColDefs[ field ],
            sort: newSort
         }
      };

      const sortModel = Object
         .entries( listApi.customColDefs )
         .filter( ( o: any ) => o[ 1 ].sort )
         .map( ( def: any ) => ( { sort: def[ 1 ].sort, colId: def[ 1 ].field } ) );

      api.listApi.sortRows( {
         startRow: 0,
         sortModel: sortModel
      } );

      api.listApi.sortColumnPublisher.publish();
   };

   const visibleHeaders = useMemo( () => {
      if ( !mergedDefs.length ) return <></>;

      return mergedDefs
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
                  onMouseEnter={ ( e ) => $columnMouseenterEvent
                     .mouseenter( e as any, def.moveable, def.field ) }
               >
                  <div className={ styles.headerFieldLabel }>
                     { def.label
                        ? <span>{ def.label || def.field }</span>
                        : null }

                     <span className={ styles.columnMover }
                        onMouseDown={ ( e ) => columnMoveEvents.mousedown( e as any, def.field, fieldId ) }
                        onMouseUp={ ( e ) => sortColumn( def.field ) } />
                  </div>

                  <div className={ styles.columnMenuWrapper }>
                     { def.sort == 'asc'
                        ? <div className={ styles.columnSort } onMouseUp={ ( e ) => sortColumn( def.field ) }>
                           <SvgIcon svgName="chevron_up_solid" size="small" />
                        </div>
                        : def.sort == 'desc'
                           ? <div className={ styles.columnSort } onMouseUp={ ( e ) => sortColumn( def.field ) }>
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

                  <div className={ styles.columnResizer }>
                     { def.resizable !== false
                        ? <span onMouseDown={ ( e ) =>
                           columnResizeEvents.mousedown( e as any, def.field ) } />
                        : null }
                  </div>
               </div>
            );
         } );
   }, [ mergedDefs ] );


   const visibleRows = useMemo( () => {
      if ( !api.listApi.rowData.length ) return <></>;

      return new Array( visibleNodeCount )
         .fill( null )
         .map( ( _, index ) => {
            const rowStyle = { height: api.listApi.childHeight } as CSSProperties;

            return (
               <div key={ index + startNode } className={ styles.listRow } style={ rowStyle }>
                  { mergedDefs.filter( def => !def.hidden ).map( ( def, i ) => {
                     const fieldStyle = {
                        willChange: 'width',
                        width: def.width || def.minWidth,
                        minWidth: def.minWidth,
                     } as CSSProperties;

                     return (
                        <div key={ i + startNode } style={ fieldStyle } className={ styles.rowField }>
                           { api.listApi.rowData[ index + startNode ][ def.field ] }
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
      if ( bottomTrigger > el?.scrollHeight && $scrollDirection > 0 )
         api.listApi.getRows( { startRow: api.listApi.rowData.length } );
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
         <div className={ styles.wrapper }>

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

            <HeaderMenu></HeaderMenu>

         </div>
      </div>
   );
};


export const MemoVirtualScroll = memo( VirtualScroll );