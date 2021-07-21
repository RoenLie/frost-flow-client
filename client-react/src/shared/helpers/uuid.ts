// this is a very simple implementation of UUID, if a more real usecase appears, use the UUID library
export const uuid = () => {
   let dt = new Date().getTime();

   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function ( c ) {
         var r = ( dt + Math.random() * 16 ) % 16 | 0;
         dt = Math.floor( dt / 16 );
         return ( c === 'x' ? r : ( r & 0x3 ) | 0x8 ).toString( 16 );
      },
   );
};