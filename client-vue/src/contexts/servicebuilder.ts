export function servicebuilder( serviceName: string ) {
   const services = import.meta.glob( `./${ serviceName }.*` );
   console.log( services );

}