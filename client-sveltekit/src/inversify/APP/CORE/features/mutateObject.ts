type MutateObject<T> = ( object: T, mutator: ( key: string, value: T ) => [ string, T ] ) => T;

/**
 * Lets you perform a callback function to mutate the keys and values of an object
 */
export const mutateObject: MutateObject<unknown> = ( object, mutator ) => Object.fromEntries(
   Object.entries( object ).map( ( [ key, value ] ) => mutator( key, value ) )
);