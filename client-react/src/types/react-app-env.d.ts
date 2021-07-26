import { AriaAttributes } from "react";

declare module '*.svg?component' {
   import * as React from 'react';
   export const ReactComponent: React.FunctionComponent<
      React.SVGProps<SVGSVGElement> & { title?: string; }
   >;
   export default ReactComponent;
}

/**
 * The type of `import.meta`.
 *
 * If you need to declare that a given property exists on `import.meta`,
 * this type may be augmented via interface merging.
 */
interface ImportMeta {
   [ x: string ]: any;
}