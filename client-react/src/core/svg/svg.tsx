import React from 'react';
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
}

class SvgIconService {
   svgs: any;
   add = ( name: string, svg: any ) => this.svgs[ name ] = svg;
}
export const svgIconService = new SvgIconService();

export const SvgIcon = ( { size, width, svgName }: ISvgIconProps ) => {
   const Icon = svgIconService.svgs[ svgName ];

   const iconSize = {
      small: '1rem',
      medium: '2rem',
      large: '3rem',
      xlarge: '4rem'
   };

   const iconStyle = {
      width: size ? iconSize[ size ] : width ? width : iconSize[ 'medium' ]
   };

   return (
      <div style={ iconStyle } className={ styles.svgWrapper }>
         <Icon />
      </div >
   );
};