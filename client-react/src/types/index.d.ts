export { };

declare global {
   namespace JSX {
      interface IntrinsicElements {
         'frost-list-grid': { ref: React.MutableRefObject<any>; };
      }
   }
}