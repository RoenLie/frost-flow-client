type TPublication<T> = ( value: T, previousValue: T ) => void;
export class Publisher<T> {
   #subscribers: ( TPublication<T> )[] = [];
   #value: T;
   #previousValue: T;

   get value() {
      return this.#value;
   }
   get previousValue() {
      return this.#previousValue;
   }

   constructor ( value: T ) {
      this.#value = value, this.#previousValue = value;
   }

   next( value?: T ) {
      if ( value === undefined ) {
         this.publish();
         return;
      }

      this.#previousValue = JSON.parse( JSON.stringify( this.#value ) );
      this.#value = value;

      this.publish();
   }
   subscribe( cb: TPublication<T> ) {
      const newLength = this.#subscribers.push( cb );
      return { unsubscribe: () => this.unsubscribe( newLength - 1 ) };
   }
   unsubscribe( index: number ) {
      this.#subscribers.splice( index, 1 );
   }
   publish() {
      this.#subscribers.forEach( cb => {
         ( async () => {
            cb( this.#value, this.#previousValue );
         } )();
      } );
   }
}