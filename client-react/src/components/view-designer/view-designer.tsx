import React, { ChangeEvent, CSSProperties, memo, ReactNode, useMemo, useState } from "react";
import { IComposedView, IField, ISection } from "hooks/types";
import styles from './view-designer.module.css';
import { uuid } from "shared";
import { env } from "env/env";
import { asyncRes } from "shared/helpers";
import { AxiosStatic } from "axios";
import { SvgIcon } from "features/svg";


interface IViewDesignerProps { view: IComposedView; }
export const ViewDesigner = ( { view }: IViewDesignerProps ) => {
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
      grid_width: 0,
      grid_height: 0,
      grid_x_from: 0,
      grid_x_to: 0,
      grid_y_from: 0,
      grid_y_to: 0,
      section_order: 0,
   } as ISection );

   const addSection = () => {
      const sectionId = uuid();
      viewData.section.push( emptySection( sectionId ) );
      viewData.field[ sectionId ] = [];

      setViewData( { ...viewData } );
   };

   const save = async () => {
      const axios: AxiosStatic = ( await import( "axios" ) ).default;
      axios.defaults.baseURL = env.epochHost;
      const [ res, err ] = await asyncRes( axios.request( {
         method: 'post',
         url: '/postgres/view/upsert'
      } ) );

      console.log( res, err );



      // const fetchData = async () => {
      //    setLoading( true );
      //    try {
      //       const res = await axios.request( params );
      //       setResponse( res.data );
      //       setError( null );
      //    } catch ( err ) {
      //       setError( err );
      //    } finally {
      //       setLoading( false );
      //    }
      // };



      // const saveView = useAxios( {
      //    baseUrl: env.epochHost,
      //    params: {
      //       url: '/postgres/view/upsert'
      //    }
      // } );
   };


   return (
      <div className={ styles.host }>
         <h1 className={ styles.header }>ViewDesigner</h1>
         <hr></hr>
         <button onClick={ save }>SAVE</button>
         <hr></hr>

         <div className={ styles.body }>
            <h1>Sections</h1>
            { viewData.section.map( sec => {
               return (
                  <GridSection
                     key={ sec.sys_id }
                     section={ sec }
                     fields={ viewData.field[ sec.sys_id ] }
                     columns={ viewData.columns }
                     onChange={ ( s, f ) => { /* console.log( 'grid updated', s, f ); */ } }
                  />
               );
            } ) }
            <button onClick={ addSection } >ADD SECTION</button>
         </div>

         <hr></hr>
         <pre>
            { JSON.stringify( view, null, 2 ) }
         </pre>
      </div>
   );
};


interface IGridSectionProps {
   onChange?: ( sec: ISection, fields: IField[] ) => void;
   section: ISection;
   fields: IField[];
   columns: { name: string, type: string; }[];
   children?: ReactNode;
}
const GridSection = memo( (
   { onChange: onSectionUpdate, section, fields, columns }: IGridSectionProps
) => {
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
            onSectionUpdate?.( $section, $gridFields );
         }
      },
      mouseup() {
         this.activeField = null;
         this.action = '';
         this.size = [ 0, 0 ];
         setGridFields( [ ...$gridFields ] );

         this.subscription.unsub();
      },
      addField() {
         $gridFields.push( emptyField( uuid() ) );
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
   const [ $section, setSection ] = useState( Object.jsonCopy( section ) );
   const [ $gridFields, setGridFields ] = useState( Object.jsonCopy( fields ) );
   const [ $menuLocation, setMenuLocation ] = useState( [ 0, 0 ] );

   const gridMaxSizes = [ 4, 10 ];
   const grid = new Array( $section.grid_height || 1 )
      .fill( new Array( $section.grid_width || 1 ).fill( null ) );

   const gridStyle = {
      gridTemplateRows: grid.map( () => '1fr' ).join( ' ' ),
      gridTemplateColumns: grid[ 0 ].map( () => '1fr' ).join( ' ' ),
      backgroundColor: $gridFieldEvents.action ? 'var(--border-grey-strong-1)' : ''
   } as CSSProperties;

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
      onSectionUpdate?.( $section, $gridFields );
   };

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

   const changeFieldLabel = ( { target }: { target: HTMLInputElement; }, index: number ) => {
      $gridFields[ index ].label = target.value;
      setGridFields( [ ...$gridFields ] );
      onSectionUpdate?.( $section, $gridFields );
   };

   const changeFieldColumn = ( { target }: { target: HTMLSelectElement; }, index: number ) => {
      $gridFields[ index ].column_name = target.value;
      setGridFields( [ ...$gridFields ] );
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
                  />
                  <select
                     className={ styles.gridSelect }
                     value={ field.column_name }
                     onChange={ ( e ) => changeFieldColumn( e, i ) }
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
      <div>
         <input className={ styles.gridInput }
            value={ $section.name }
            onChange={ changeSectionName }
         />
      </div>

      <div>
         <select
            className={ styles.gridSelect }
            value={ $section.grid_width }
            onChange={ ( e: any ) => changeGridSize( e, 'x' ) }
         >
            { new Array( gridMaxSizes[ 0 ] ).fill( null ).map( ( _, i ) =>
               <option key={ i } value={ i + 1 }>{ i + 1 }</option> ) }
         </select>
         <select
            className={ styles.gridSelect }
            value={ $section.grid_height }
            onChange={ ( e: any ) => changeGridSize( e, 'y' ) }
         >
            { new Array( gridMaxSizes[ 1 ] ).fill( null ).map( ( _, i ) =>
               <option key={ i } value={ i + 1 }>{ i + 1 }</option> ) }
         </select>
      </div>
   </> ),
      [ $section ] );

   const gridFooter = useMemo( () => {
      return (
         <div className={ styles.gridActions }>
            <button onClick={ () => $gridFieldEvents.addField() }>
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