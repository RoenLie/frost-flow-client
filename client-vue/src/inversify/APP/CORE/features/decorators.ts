import { uuid } from "~/helpers/uuid";

export function EsInitialize<T extends { new( ...args: any[] ): {}; }>( Base: T ) {
   const originalName = Base.name;
   console.log( 'name of base class', originalName );

   return class extends Base {
      get [ Symbol.toStringTag ]() {
         return originalName;
      }
      // static [ Symbol.hasInstance ]( instance: any ) { return this.isPrototypeOf( instance ); }
   };
}

// export function EsBaseEntity( typeOfName: Symbol | string ) {
export function EsService() {
   const name = Symbol( uuid() );

   return function ( constructor: Function ) {
      constructor.prototype._typeOf = name;
   };
}

export function typeOf( _class: any ) {
   const decoratorName = "EsBaseEntity";
   const _ = new _class();
   const type = _.constructor.prototype._typeOf;

   const error = `Class ${ _.constructor.name } has not been decorated `
      + `by ${ decoratorName } and gained a _typeOf property.`;

   if ( !type ) throw new Error( error );

   return type;
}