declare interface Window {
   // extend the window
}

// with vite-plugin-md, markdowns can be treat as Vue components
declare module '*.md' {
   import { ComponentOptions } from 'vue';
   const component: ComponentOptions;
   export default component;
}

// typescript can't find type info on vue components
// and the volar ts extension kills normal ts files.
declare module '*.vue' { }