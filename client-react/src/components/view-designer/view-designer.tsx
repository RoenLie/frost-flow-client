import React, { ChangeEvent, CSSProperties, memo, ReactNode, useMemo, useState } from "react";
import { IComposedView, IField, ISection, IView } from "hooks/types";
import styles from './view-designer.module.css';
import { uuid } from "shared";
import { env } from "env/env";
import { asyncRes } from "shared/helpers";
import { AxiosStatic } from "axios";


export const ViewDesigner = ( { view }: { view: IComposedView; } ) => {
   const [ viewData, setNewViewData ] = useState( { view: {}, section: [] as any, field: {} } as IComposedView );

   useMemo( () => {
      if ( !view.view || !view.section || !view.field ) return;

      const copyView = Object.jsonCopy( view );
      setNewViewData( copyView );
   }, [ view ] );

   function emptySection( this: ISection ) {
      this.sys_id = uuid();
      this.sys_created_at = '';
      this.sys_updated_at = '';
      this.view_id = '';
      this.section_id = '';
      this.name = '';
      this.grid_width = 0;
      this.grid_height = 0;
      this.grid_x_from = 0;
      this.grid_x_to = 0;
      this.grid_y_from = 0;
      this.grid_y_to = 0;
      this.section_order = 0;
   }

   function emptyField( this: IField ) {
      this.sys_id = uuid();
      this.sys_created_at = '';
      this.sys_updated_at = '';
      this.section_id = '';
      this.column_name = '';
      this.label = '';
      this.grid_x_from = 0;
      this.grid_x_to = 0;
      this.grid_y_from = 0;
      this.grid_y_to = 0;
   }

   const addSection = () => {
      viewData.section.push( new emptySection() );

      setNewViewData( { ...viewData } );
   };

   const addField = ( sectionId: string ) => {
      const existingFields = viewData?.field[ sectionId ];
      if ( !existingFields ) viewData.field[ sectionId ] = [];

      viewData.field[ sectionId ].push( new emptyField() );

      setNewViewData( { ...viewData } );
   };

   const updateSectionName = ( event: ChangeEvent, sectionIndex: number ) => {
      const target = event.target as HTMLInputElement;
      viewData.section[ sectionIndex ].name = target.value + '';

      setNewViewData( { ...viewData } );
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

   const gridFieldEvents = {
      size: [ 0, 0 ],
      activeVector: null as number | null,
      action: '' as 'resize' | 'move' | '',
      subscriptions: [] as any[],
      subscribe() {
         this.subscriptions.push( [ 'mouseup', this.mouseup.bind( this ) ] );
         this.subscriptions.forEach( s => addEventListener( s[ 0 ], s[ 1 ] ) );
         setGridFields( [ ...gridFields ] );
      },
      unsubscribe() {
         this.activeVector = null;
         this.action = '';
         this.size = [ 0, 0 ];
         this.subscriptions.forEach( s => removeEventListener( s[ 0 ], s[ 1 ] ) );
         setGridFields( [ ...gridFields ] );
      },
      mousedownMove( e: MouseEvent, fieldIndex: number, size: number[] ) {
         e.preventDefault();
         this.activeVector = fieldIndex;
         this.action = 'move';
         this.size = size;
         this.subscribe();
      },
      mousedownResize( e: MouseEvent, fieldIndex: number, size: number[] ) {
         e.preventDefault();
         this.activeVector = fieldIndex;
         this.action = 'resize';
         this.size = size;
         this.subscribe();
      },
      mouseenter( e: MouseEvent ) {
         if ( this.activeVector === null ) return;

         const target = e.target as HTMLElement;
         const vector = target.getAttribute( 'data-vector' ) + '';

         if ( this.action == 'resize' ) {
            gridFields[ this.activeVector ].toX = +vector[ 1 ] + 2;
            gridFields[ this.activeVector ].toY = +vector[ 0 ] + 2;
         }
         if ( this.action == 'move' ) {
            const gridField = gridFields[ this.activeVector ];
            const sizeX = gridField.toX - gridField.fromX;
            const sizeY = gridField.toY - gridField.fromY;

            const newFromX = +vector[ 1 ] + 1;
            const newFromY = +vector[ 0 ] + 1;
            const newToX = newFromX + sizeX;
            const newToY = newFromY + sizeY;

            if ( newToX - 1 <= this.size[ 1 ] ) {
               gridFields[ this.activeVector ].fromX = newFromX;
               gridFields[ this.activeVector ].toX = newToX;
            }
            if ( newToY - 1 <= this.size[ 0 ] ) {
               gridFields[ this.activeVector ].fromY = newFromY;
               gridFields[ this.activeVector ].toY = newToY;
            }
         }

         setGridFields( [ ...gridFields ] );
      },
      mouseup() {
         this.unsubscribe();
      }
   };

   const [ $gridFieldEvents ] = useState( gridFieldEvents );
   const [ gridFields, setGridFields ] = useState( [
      { fromX: 1, toX: 2, fromY: 1, toY: 2, label: 'kake' }
   ] );

   const GridSection = memo( ( { size = [ 5, 5 ] }: { size: number[]; children?: ReactNode; } ) => {
      const grid = new Array( size[ 0 ] )
         .fill( new Array( size[ 1 ] ).fill( '' ) );

      const gridStyle = {
         gridTemplateRows: grid.map( () => '1fr' ).join( ' ' ),
         gridTemplateColumns: grid[ 0 ].map( () => '1fr' ).join( ' ' )
      } as CSSProperties;

      return (
         <div style={ gridStyle } className={ styles.sectionGrid }
         >
            { grid.map( ( grid1, i1 ) => grid1.map( ( _: never, i2: number ) => {
               const gridStyle = {
                  gridRow: `${ i1 + 1 }/${ i1 + 2 }`,
                  gridColumn: `${ i2 + 1 }/${ i2 + 2 }`,
                  userSelect: 'none',
                  backgroundColor: 'coral'
               } as CSSProperties;

               return (
                  <div key={ i1 + '' + i2 }
                     style={ gridStyle }
                     data-vector={ i1 + '' + i2 }
                     onMouseEnter={ ( e: any ) => $gridFieldEvents.mouseenter( e ) }
                  >{ i1 }{ i2 }
                  </div>
               );
            } ) ) }

            { gridFields.map( ( field, i ) => {
               const fieldStyle = {
                  gridRow: `${ field.fromY }/${ field.toY }`,
                  gridColumn: `${ field.fromX }/${ field.toX }`,
                  pointerEvents: $gridFieldEvents.action ? 'none' : '',
                  outline: $gridFieldEvents.action ? '2px solid red' : '',
                  backgroundColor: 'pink',
                  color: 'black',
               } as CSSProperties;

               return (
                  <div key={ i } style={ fieldStyle } className={ styles.gridField }
                  >
                     <div onMouseDown={ ( e: any ) =>
                        $gridFieldEvents.mousedownMove( e, i, size ) } />
                     <div >
                        { field.label }
                     </div>
                     <div onMouseDown={ ( e: any ) =>
                        $gridFieldEvents.mousedownResize( e, i, size ) } />
                  </div>
               );
            } ) }
         </div>
      );
   } );

   return (
      <div className={ styles.host }>
         <h1 className={ styles.header }>ViewDesigner</h1>
         <hr></hr>
         <button onClick={ save }>SAVE</button>

         { viewData?.section?.length
            ? viewData.section.map( ( sec, i ) => {
               return (
                  <div key={ sec.sys_id } className={ styles.section }>
                     <div>
                        <label htmlFor={ 'section' + i }>Section</label>
                        <input id={ 'section' + i }
                           onChange={ ( e ) => updateSectionName( e, i ) }
                           value={ sec.name } />
                     </div>
                     { viewData.field[ sec.sys_id ]?.map( ( field, i ) => {
                        return (
                           <div key={ field.sys_id }>{ field.label }{ i }</div>
                        );
                     } ) }
                     <button onClick={ () => addField( sec.sys_id ) }>
                        add new field
                     </button>
                  </div>
               );
            } )
            : (
               <div className={ styles.section }>
                  make new section
               </div>
            ) }
         <button onClick={ addSection }>add section</button>
         <hr></hr>

         <div>
            <h1>new grid idea</h1>
            <GridSection size={ [ 5, 3 ] }></GridSection>
         </div>

         <hr></hr>
         <pre>
            { JSON.stringify( view, null, 2 ) }
         </pre>
      </div>
   );
};





{
   interface ISection {
      gridSize: number[];
      gridArea: string;
   }
}