import { useMemo } from "react";


export const useClasses = ( ...args: any[] ) =>
   useMemo( () => [ ...args ].join( ' ' ), [ ...args ] );