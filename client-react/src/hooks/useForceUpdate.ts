import { useState } from 'react';


//create your forceUpdate hook
export function useForceUpdate() {
   const [ value, setValue ] = useState( 0 ); // integer state
   return () => setValue( () => Math.floor( Math.random() * 100 ) ); // update the state to force render
}