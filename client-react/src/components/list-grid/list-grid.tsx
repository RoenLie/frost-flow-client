import { MemoVirtualScroll } from "features/virtual-scroll/virtual-scroll";
import React, { HTMLAttributes, memo, useEffect, useMemo, useRef, useState } from 'react';
import styles from './styles.module.css';


const Item = memo( ( { index }: any ) => (
   <div
      style={ {
         height: 30,
         lineHeight: "30px",
         display: "flex",
         justifyContent: "space-between",
         padding: "0 10px"
      } }
      className="row"
      key={ index }
   >
      row index { index }
   </div>
) );


interface IListGridProps extends HTMLAttributes<HTMLDivElement> { };
export const ListGrid = ( { className }: IListGridProps ) => {
   const hostClasses = useMemo( () => [ styles.host, className ].join( ' ' ), [ className ] );

   const [ listHeight, setListHeight ] = useState( 300 );
   const listContainerRef = useRef<HTMLDivElement>( null );

   const calcListHeight = () => {
      const el = listContainerRef.current;
      if ( !el ) return;

      const rects = el.getBoundingClientRect();
      const listHeight = rects.bottom > window.innerHeight
         ? window.innerHeight - rects.top - 1
         : rects.height;

      setListHeight( listHeight );
   };

   useEffect( () => {
      calcListHeight();
      addEventListener( 'resize', calcListHeight );
      return () => removeEventListener( 'resize', calcListHeight );
   }, [] );


   return (
      <div className={ hostClasses } ref={ listContainerRef }>
         <MemoVirtualScroll
            itemCount={ 10000 }
            height={ listHeight }
            childHeight={ 30 }
            Item={ Item } />
      </div>
   );
};

