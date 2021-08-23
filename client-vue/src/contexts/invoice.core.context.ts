function invoiceCoreContext( this: any ) {
   console.log( "core context" );
   console.log( this.priority );

   this.kake = "hei";
}

export default invoiceCoreContext;