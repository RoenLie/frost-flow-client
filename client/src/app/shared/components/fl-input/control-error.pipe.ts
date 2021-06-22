import { Pipe, PipeTransform } from '@angular/core';


@Pipe( {
   name: 'formControllError'
} )
export class FormControlErrorPipe implements PipeTransform {
   transform( error: any ): any {
      if ( !error ) return null;

      const message = [];
      const validator: [ string, any ] = Object.entries( error )[ 0 ];

      const validatorName: string = validator[ 0 ];
      const validatorValue: any = Object.values( validator[ 1 ] );

      message.push( validatorName );

      if ( !validatorValue.length ) {
         message.push( validator[ 1 ] );
      } else {
         message.push( validatorValue[ 0 ] );
      }

      return message.join( ": " );
   }
}