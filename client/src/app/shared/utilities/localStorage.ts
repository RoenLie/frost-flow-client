class CustomLocalStorage {
   setItem( key: string, data: any ) {
      localStorage.setItem( key, JSON.stringify( data ) );
   }
   getItem( key: string ) {
      const data = localStorage.getItem( key );

      if ( data == "undefined" ) return null;

      return data ? JSON.parse( data ) : null;
   }
   key( index: number ) {
      return localStorage.key( index );
   }
   clear() {
      return localStorage.clear();
   }
}

const LocalStorage = new CustomLocalStorage();

export { LocalStorage };