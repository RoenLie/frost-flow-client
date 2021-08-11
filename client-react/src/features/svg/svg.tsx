import React, { CSSProperties, Suspense } from 'react';
import styles from './styles.module.css';
import icons from 'assets/iconsheet.svg';


type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
   Pick<T, Exclude<keyof T, Keys>>
   & {
      [ K in Keys ]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
   }[ Keys ];
type SvgIconSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
interface ISvgIconProps {
   size?: SvgIconSize;
   width?: string;
   svgName: string;
   onClick?: ( e: any ) => any;
}

class SvgIconService {
   svgs: { [ key: string ]: any; } = {};
   add = ( name: string, svg: any ) => this.svgs[ name ] = svg;
}
export const svgIconService = new SvgIconService();

export const SvgIcon = ( { size, width, svgName, onClick }: ISvgIconProps ) => {
   const Icon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
         <use xlinkHref={ `${ icons }#icon-${ svgName }` } />
      </svg>
   );

   const iconSize = {
      xsmall: '0.75rem',
      small: '1rem',
      medium: '1.5rem',
      large: '3rem',
      xlarge: '5rem'
   };

   const iconStyle = {
      width: size ? iconSize[ size ] : width ? width : iconSize[ 'medium' ],
      height: size ? iconSize[ size ] : width ? width : iconSize[ 'medium' ]
   } as CSSProperties;

   return (
      <div style={ iconStyle } className={ styles.svgWrapper }
         onClick={ onClick }>
         <Suspense fallback={ <div>⟳</div> }>
            <Icon />
         </Suspense>
      </div >
   );
};