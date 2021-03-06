import React, { CSSProperties, memo, ReactNode, useMemo, useState } from "react";
import { IComposedView, IField, ISection } from "hooks/types";
import styles from './view-designer.module.css';
import { uuid } from "shared";
import { env } from "env/env";
import { asyncRes } from "shared/helpers";
import { AxiosStatic } from "axios";
import { SvgIcon } from "features/svg";
import { rootToastService } from "features/toast";


interface IViewDesignerProps {
   onSave: ( promise: Promise<any> ) => void;
   view: IComposedView;
}
export const ViewDesigner = ( { view, onSave: OnViewSaved }: IViewDesignerProps ) => {
   if ( Object.isEmpty( view ) ) return null;

   const [ viewData, setViewData ] = useState( Object.jsonCopy( view ) );
   useMemo( () => setViewData( Object.jsonCopy( view ) ), [ view ] );

   const emptySection = ( id: string ) => ( {
      sys_id: id,
      sys_created_at: '',
      sys_updated_at: '',
      view_id: '',
      section_id: '',
      name: '',
      grid_width: 1,
      grid_height: 1,
      section_order: 0,
   } as ISection );

   const addSection = ( id: string ) => {
      const newSection = emptySection( uuid() );
      const order = viewData.section.find( s => s.sys_id == id )?.section_order || 0;

      newSection.section_order = order + 1;
      viewData.section.push( newSection );
      viewData.field[ newSection.sys_id ] = [];

      setViewData( { ...viewData } );
   };

   const removeSection = ( id: string ) => {
      const index = viewData.section.findIndex( s => s.sys_id === id );
      if ( index < 0 ) return;
      viewData.section.splice( index, 1 );
      setViewData( { ...viewData } );
   };

   const save = async () => {
      const axios: AxiosStatic = ( await import( "axios" ) ).default;
      axios.defaults.baseURL = env.epochHost;
      const res = asyncRes( axios.request( {
         method: 'post',
         url: '/postgres/view/upsert',
         data: viewData
      } ) );

      OnViewSaved?.( res );
   };

   const updateViewSectionData = ( section: ISection, fields: IField[] ) => {
      const sectionIndex = viewData.section.findIndex( s => s.sys_id == section.sys_id );
      viewData.section[ sectionIndex ] = section;
      viewData.field[ section.sys_id ] = fields;

      setViewData( { ...viewData } );
   };


   return (
      <div className={ styles.host }>
         <h1 className={ styles.header }>ViewDesigner</h1>
         <hr></hr>
         <button onClick={ save }>SAVE</button>
         <hr></hr>

         <div className={ styles.body }>
            <h1>Sections</h1>
            { viewData.section
               .sort( ( a, b ) => a.section_order - b.section_order )
               .map( sec => {
                  return (
                     <GridSection
                        key={ sec.sys_id }
                        section={ sec }
                        fields={ viewData.field[ sec.sys_id ] }
                        columns={ viewData.columns }
                        onChange={ ( s, f ) => updateViewSectionData( s, f ) }
                        onAdd={ ( s ) => addSection( s ) }
                        onRemove={ ( s ) => removeSection( s ) }
                     />
                  );
               } ) }
         </div>
      </div>
   );
};


interface IGridSectionProps {
   onChange?: ( sec: ISection, fields: IField[] ) => void;
   onAdd?: ( secId: string ) => void;
   onRemove?: ( secId: string ) => void;
   section: ISection;
   fields: IField[];
   columns: { name: string, type: string; }[];
   children?: ReactNode;
}
const GridSection = memo( ( {
   onChange: onSectionUpdate,
   onAdd: onSectionAdd,
   onRemove: onSectionRemove,
   section,
   fields,
   columns
}: IGridSectionProps ) => {
   if ( Object.isEmpty( section ) ) return null;

   const gridFieldEvents = {
      size: [ 0, 0 ],
      activeField: null as number | null,
      action: '' as 'resize' | 'move' | '',
      subscription: {
         subs: [] as any[],
         sub() {
            this.subs.forEach( s => addEventListener( s[ 0 ], s[ 1 ] ) );
         },
         unsub() {
            this.subs.forEach( s => removeEventListener( s[ 0 ], s[ 1 ] ) );
            this.subs = [];
         }
      },
      mousedownMove( e: MouseEvent, index: number, size: number[] ) {
         e.preventDefault();
         this.eventMoveResizeStart( 'move', index, size );
      },
      mousedownResize( e: MouseEvent, index: number, size: number[] ) {
         e.preventDefault();
         this.eventMoveResizeStart( 'resize', index, size );
      },
      eventMoveResizeStart( action: 'resize' | 'move', index: number, size: number[] ) {
         this.action = action;
         this.activeField = index;
         this.size = size;

         setMenuLocation( [ 0, 0 ] );
         setGridFields( $gridFields );

         this.subscription.unsub();
         this.subscription.subs.push( [ 'mouseup', this.mouseup.bind( this ) ] );
         setTimeout( () => this.subscription.sub() );
      },
      mouseenter( event: any ) {
         const e = event as MouseEvent;

         if ( this.activeField === null ) return;
         if ( e.buttons !== 1 ) return;

         const target = e.target as HTMLElement;
         const vector = target.getAttribute( 'data-vector' ) + '';

         if ( this.action == 'resize' ) {
            $gridFields[ this.activeField ].grid_x_to = +vector[ 1 ] + 2;
            $gridFields[ this.activeField ].grid_y_to = +vector[ 0 ] + 2;
         }
         if ( this.action == 'move' ) {
            const gridField = $gridFields[ this.activeField ];
            const sizeX = gridField.grid_x_to - gridField.grid_x_from;
            const sizeY = gridField.grid_y_to - gridField.grid_y_from;

            const newFromX = +vector[ 1 ] + 1;
            const newFromY = +vector[ 0 ] + 1;
            const newToX = newFromX + sizeX;
            const newToY = newFromY + sizeY;

            if ( newToX - 1 <= this.size[ 1 ] ) {
               $gridFields[ this.activeField ].grid_x_from = newFromX;
               $gridFields[ this.activeField ].grid_x_to = newToX;
            }
            if ( newToY - 1 <= this.size[ 0 ] ) {
               $gridFields[ this.activeField ].grid_y_from = newFromY;
               $gridFields[ this.activeField ].grid_y_to = newToY;
            }
         }

         if ( this.action ) {
            setGridFields( [ ...$gridFields ] );
         }
      },
      mouseup() {
         this.activeField = null;
         this.action = '';
         this.size = [ 0, 0 ];
         setGridFields( [ ...$gridFields ] );
         onSectionUpdate?.( $section, $gridFields );

         this.subscription.unsub();
      },
      addField() {
         const newField = emptyField( uuid() );
         newField.section_id = $section.sys_id;
         newField.column_name = columns[ 0 ].name;
         newField.label = columns[ 0 ].name;

         $gridFields.push( newField );
         setGridFields( [ ...$gridFields ] );
         onSectionUpdate?.( $section, $gridFields );
      },
      removeField() {
         if ( $gridFieldEvents.activeField == null ) return;

         $gridFields.splice( $gridFieldEvents.activeField, 1 );
         setGridFields( [ ...$gridFields ] );

         onSectionUpdate?.( $section, $gridFields );

         $gridFieldEvents.closeMenu();
      },
      openMenu( e: MouseEvent, index: number ) {
         e.preventDefault();

         this.activeField = index;
         setMenuLocation( [ e.clientX + 15, e.clientY - 15 ] );

         this.subscription.unsub();
         this.subscription.subs.push( [ 'mousedown', this.closeMenu.bind( this ) ] );
         setTimeout( () => this.subscription.sub() );
      },
      closeMenu( e?: MouseEvent ) {
         const insideMenu = e?.composedPath()
            .some( ( path: EventTarget ) => {
               const p = path as HTMLElement;
               if ( !p.getAttribute ) return;
               return p.getAttribute( 'data-name' ) == 'gridFieldMenu';
            } );

         if ( insideMenu ) return;

         this.activeField = null;
         setMenuLocation( [ 0, 0 ] );

         this.subscription.unsub();
      }
   };

   const [ $gridFieldEvents ] = useState( gridFieldEvents );
   const [ $section, setSection ] = useState( Object.jsonCopy( section ) || [] );
   const [ $gridFields, setGridFields ] = useState( Object.jsonCopy( fields ) || [] );
   const [ $menuLocation, setMenuLocation ] = useState( [ 0, 0 ] );

   const gridMaxSizes = [ 4, 10 ];
   const grid = new Array( $section.grid_height || 1 )
      .fill( new Array( $section.grid_width || 1 ).fill( null ) );

   const gridStyle = {
      gridTemplateRows: grid.map( () => '1fr' ).join( ' ' ),
      gridTemplateColumns: grid[ 0 ].map( () => '1fr' ).join( ' ' ),
      backgroundColor: $gridFieldEvents.action ? 'var(--border-grey-strong-1)' : ''
   } as CSSProperties;

   const emptyField = ( id: string ) => ( {
      sys_id: id,
      sys_created_at: '',
      sys_updated_at: '',
      section_id: '',
      column_name: '',
      label: '',
      grid_x_from: 0,
      grid_x_to: 0,
      grid_y_from: 0,
      grid_y_to: 0
   } as IField );

   const changeGridSize = ( { target }: { target: HTMLInputElement; }, xy: ( 'x' | 'y' ) ) => {
      if ( xy == 'x' ) {
         $section.grid_width = +target.value;
         setSection( { ...$section } );
         onSectionUpdate?.( $section, $gridFields );
      }
      if ( xy == 'y' ) {
         $section.grid_height = +target.value;
         setSection( { ...$section } );
         onSectionUpdate?.( $section, $gridFields );
      }
   };

   const changeSectionName = ( { target }: { target: HTMLInputElement; } ) => {
      $section.name = target.value;
      setSection( { ...$section } );
   };

   const changeSectionOrder = ( { target }: { target: HTMLInputElement; } ) => {
      const val = +target.value;
      if ( isNaN( val ) ) return;

      $section.section_order = val;
      setSection( { ...$section } );
   };

   const changeFieldLabel = ( { target }: { target: HTMLInputElement; }, index: number ) => {
      $gridFields[ index ].label = target.value;
      setGridFields( [ ...$gridFields ] );
   };

   const changeFieldColumn = ( { target }: { target: HTMLSelectElement; }, index: number ) => {
      $gridFields[ index ].column_name = target.value;
      setGridFields( [ ...$gridFields ] );
   };

   const emitSectionAdd = () => {
      onSectionAdd?.( section.sys_id );
   };

   const emitSectionRemove = () => {
      onSectionRemove?.( section.sys_id );
   };

   const emitSectionUpdate = () => {
      onSectionUpdate?.( $section, $gridFields );
   };

   const gridBackdrop = useMemo( () =>
      grid.map( ( grid1, i1 ) => grid1.map( ( _: never, i2: number ) => {
         const gridStyle = {
            gridRow: `${ i1 + 1 }/${ i1 + 2 }`,
            gridColumn: `${ i2 + 1 }/${ i2 + 2 }`
         } as CSSProperties;

         return (
            <div
               key={ i1 + '' + i2 }
               style={ gridStyle }
               className={ styles.gridFieldBackdrop }
               data-vector={ i1 + '' + i2 }
               onMouseEnter={ ( e: any ) => $gridFieldEvents.mouseenter( e ) }
            />
         );
      } ) ),
      [ $section ] );

   const gridFields = useMemo( () =>
      $gridFields.map( ( field, i ) => {
         const fieldStyle = {
            gridRow: `${ field.grid_y_from }/${ field.grid_y_to }`,
            gridColumn: `${ field.grid_x_from }/${ field.grid_x_to }`,
            pointerEvents: $gridFieldEvents.activeField == i
               ? 'none' : '',
            boxShadow: $gridFieldEvents.activeField == i
               ? 'inset 0px 0px 0px 2px var(--blue-highlight-1)' : '',
         } as CSSProperties;

         const fieldMoverStyle = {
            backgroundColor: $gridFieldEvents.activeField == i
               ? 'var(--blue-highlight-1)' : ''
         };

         const size = [ $section.grid_height, $section.grid_width ];

         return (
            <div
               key={ field.sys_id }
               style={ fieldStyle }
               className={ styles.gridField }
            >
               <div
                  style={ fieldMoverStyle }
                  onMouseDown={ ( e: any ) =>
                     $gridFieldEvents.mousedownMove( e, i, size ) }
               />

               <div
                  className={ styles.gridFieldCloser }
                  onMouseDown={ ( e: any ) => $gridFieldEvents.openMenu( e, i ) }
               >
                  <SvgIcon svgName="bars-solid" size="xsmall" />
               </div>

               <div className={ styles.gridFieldCenter }>
                  <input
                     className={ styles.gridInput }
                     value={ field.label }
                     onChange={ ( e ) => changeFieldLabel( e, i ) }
                     onBlur={ emitSectionUpdate }
                  />
                  <select
                     className={ styles.gridSelect }
                     value={ field.column_name }
                     onChange={ ( e ) => changeFieldColumn( e, i ) }
                     onBlur={ emitSectionUpdate }
                  >
                     { columns.map( col => (
                        <option
                           key={ col.name }
                           value={ col.name }
                        >
                           { col.name }
                        </option>
                     ) ) }
                  </select>
               </div>

               <div
                  style={ fieldMoverStyle }
                  onMouseDown={ ( e: any ) =>
                     $gridFieldEvents.mousedownResize( e, i, size ) }
               />
            </div>
         );
      } ),
      [ $gridFields ] );

   const gridHeader = useMemo( () =>
   ( <>
      <div className={ styles.headerLeft }>
         <input
            title="order"
            className={ styles.gridInput }
            style={ { width: 100 } }
            value={ $section.section_order }
            onChange={ changeSectionOrder }
            onBlur={ emitSectionUpdate }
         />
         <select
            title="x dimension"
            className={ styles.gridSelect }
            value={ $section.grid_width }
            onChange={ ( e: any ) => changeGridSize( e, 'x' ) }
         >
            { new Array( gridMaxSizes[ 0 ] ).fill( null ).map( ( _, i ) =>
               <option key={ i } value={ i + 1 }>{ i + 1 }</option> ) }
         </select>
         <select
            title="y dimension"
            className={ styles.gridSelect }
            value={ $section.grid_height }
            onChange={ ( e: any ) => changeGridSize( e, 'y' ) }
         >
            { new Array( gridMaxSizes[ 1 ] ).fill( null ).map( ( _, i ) =>
               <option key={ i } value={ i + 1 }>{ i + 1 }</option> ) }
         </select>
      </div>

      <div className={ styles.headerCenter }>
         <input
            title="name"
            className={ styles.gridInput }
            value={ $section.name }
            onChange={ changeSectionName }
            onBlur={ emitSectionUpdate }
         />
      </div>

      <div className={ styles.gridActions + ' ' + styles.headerRight }>
         <button
            title="add section"
            onClick={ emitSectionAdd }
         >
            <SvgIcon svgName="plus-square-regular" size="small"></SvgIcon>
         </button>
         <button
            title="remove section"
            onClick={ emitSectionRemove }
         >
            <SvgIcon svgName="minus-square-regular" size="small"></SvgIcon>
         </button>
      </div>
   </> ),
      [ $section ] );

   const gridFooter = useMemo( () => {
      return (
         <div className={ styles.gridActions }>
            <button onClick={ () => $gridFieldEvents.addField() } >
               Add field
            </button>
         </div>
      );
   }, [] );

   const gridFieldMenu = useMemo( () => {
      if ( $menuLocation[ 0 ] === 0 &&
         $menuLocation[ 1 ] === 0 ) return null;

      const menuStyle = {
         top: $menuLocation[ 1 ],
         left: $menuLocation[ 0 ],
         opacity: 1
      } as CSSProperties;

      return (
         <div
            data-name="gridFieldMenu"
            className={ styles.gridFieldMenuWrapper }
            style={ menuStyle }
         >
            <div className={ styles.gridFieldMenu }>
               <div className={ styles.gridFieldContent }>
                  <button onClick={ () => $gridFieldEvents.removeField() }>
                     REMOVE
                  </button>
               </div>
            </div>
         </div >
      );
   }, [ $menuLocation ] );


   return (
      <div className={ styles.gridSectionWrapper }>
         <div className={ styles.gridSectionHeader }>
            { gridHeader }
         </div>

         <div className={ styles.gridSectionBody } style={ gridStyle }>
            { gridBackdrop }
            { gridFields }
         </div>

         <div className={ styles.gridSectionFooter }>
            { gridFooter }
         </div>

         { gridFieldMenu }
      </div >
   );
} );