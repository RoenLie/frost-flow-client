export const arraySwitch = ( arr: any[], a: number, b: number ) => {
   return [ arr[ a ], arr[ b ] ] = [ arr[ b ], arr[ a ] ];
}