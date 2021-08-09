export { };

/* Generic function implementation */
type TGenericFunction = <T>( a: T ) => void;

const genericFunction: TGenericFunction = () => {
   return;
};

genericFunction<string>( 'randomstring' );