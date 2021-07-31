import React, { Suspense } from 'react';
import styles from './styles.module.css';


type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
   Pick<T, Exclude<keyof T, Keys>>
   & {
      [ K in Keys ]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
   }[ Keys ];
type SvgIconSize = 'small' | 'medium' | 'large' | 'xlarge';
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
   const Icon = svgIconService.svgs[ svgName ];

   const iconSize = {
      small: '1rem',
      medium: '1.5rem',
      large: '3rem',
      xlarge: '5rem'
   };

   const iconStyle = {
      width: size ? iconSize[ size ] : width ? width : iconSize[ 'medium' ],
      height: size ? iconSize[ size ] : width ? width : iconSize[ 'medium' ]
   };

   return (
      <div style={ iconStyle } className={ styles.svgWrapper }
         onClick={ onClick }>
         <Suspense fallback={ <div>⟳</div> }>
            <Icon />
         </Suspense>
      </div >
   );
};