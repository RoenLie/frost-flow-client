export type HandlerFunction = ( error: Error, ctx: any, ...args: any ) => void;

export const Catch = ( errorType: any, handler: HandlerFunction ): any => {
   return ( target: any, propertyKey: string, descriptor: PropertyDescriptor ) => {
      // Save a reference to the original method
      const originalMethod = descriptor.value;

      // Rewrite original method with try/catch wrapper
      descriptor.value = function ( ...args: any[] ) {
         try {
            const result = originalMethod.apply( this, args );

            // Check if method is asynchronous
            if ( result && result instanceof Promise ) {
               // Return promise
               return result.catch( ( error: any ) => {
                  _handleError( this, errorType, handler, error, args );
               } );
            }

            // Return actual result
            return result;
         } catch ( error ) {
            _handleError( this, errorType, handler, error, args );
         }
      };

      return descriptor;
   };
};

export const CatchAll = ( handler: HandlerFunction ): any => Catch( Error, handler );

export function _handleError(
   ctx: any, errorType: any, handler: HandlerFunction, error: Error, args?: any
) {
   console.error( error );

   // Check if error is instance of given error type
   if ( typeof handler === 'function' && error instanceof errorType ) {
      // Run handler with error object and class context
      handler.call( null, error, ctx, ...args );
   } else {
      // Throw error further
      // Next decorator in chain can catch it
      throw error;
   }
}