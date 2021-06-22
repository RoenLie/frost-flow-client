import { Pipe, PipeTransform } from '@angular/core';


@Pipe( {
   name: 'sortByOrder'
} )
export class SortByOrderPipe implements PipeTransform {
   transform( keyValueArray: any[], infoObj: any ): any {
      const ordered: any[] = keyValueArray.sort( ( a: any, b: any ) => {
         const aOrder = infoObj?.[ a.key ]?.order || -1;
         const bOrder = infoObj?.[ b.key ]?.order || -1;

         return aOrder > bOrder ? 1 : -1;
      } );

      return ordered;
   }
}