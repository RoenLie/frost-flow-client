import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import tsconfigPaths from 'vite-tsconfig-paths';
import reactSvgPlugin from "vite-plugin-react-svg";
import postcssNesting from 'postcss-nesting';
import importOverriderPlugin from './vite-plugins/importOverriderPlugin';

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [
      reactRefresh(),
      tsconfigPaths(),
      reactSvgPlugin({ useSVGO: true /* optimize svg by SVGO*/ }),
      // importOverriderPlugin({
      //    verbose: false,
      //    sourceMap: true,
      //    entry: "src/overrides/index.ts"
      // })
   ],
   server: {
      port: 4300
   },
   css: {
      postcss: {
         plugins: [
            postcssNesting()
         ]
      }
   }
});
