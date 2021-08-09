export { };

declare global {
   interface Object {
      isEmpty: ( object: any ) => boolean;
      jsonCopy: <T>( object: T ) => T;
   }
}