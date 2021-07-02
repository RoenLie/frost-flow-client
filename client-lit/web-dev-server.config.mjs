import { hmrPlugin, presets } from '@open-wc/dev-server-hmr';
import { rollupAdapter } from '@web/dev-server-rollup';
import inlineSvg from 'rollup-plugin-inline-svg';
import svg from "rollup-plugin-svg";

/** Use Hot Module replacement by adding --hmr to the start command */
const hmr = process.argv.includes('--hmr');

export default /** @type {import('@web/dev-server').DevServerConfig} */ ({
   open: '/',
   watch: !hmr,

   /** Compile JS for older browsers. Requires @web/dev-server-esbuild plugin */
   // esbuildTarget: 'auto'

   /** Set appIndex to enable SPA routing */
   // appIndex: 'demo/index.html',

   /** Confgure bare import resolve plugin */
   nodeResolve: {
      exportConditions: ['browser', 'development']
   },

   middleware: [],

   plugins: [
      /** Use Hot Module Replacement by uncommenting. Requires @open-wc/dev-server-hmr plugin */
      hmr && hmrPlugin({ exclude: ['**/*/node_modules/**/*'], presets: [presets.litElement] }),
      // rollupAdapter(inlineSvg())
   ],

   // See documentation for all available options
});