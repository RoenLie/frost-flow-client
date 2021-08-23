/*
service builder takes in an array of service definitions
it will use this for building up an augmented service.
*/


class ServiceBuilder {
   constructor ( listOfServices: Augmentable[] ) {
      const modules = import.meta.glob( './dir/*.js' );
   }
}

export const serviceBuild = new ServiceBuilder( [] );