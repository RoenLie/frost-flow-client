import preprocess from 'svelte-preprocess';
import { resolve } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('@sveltejs/kit').Config} */
const config = {
   // Consult https://github.com/sveltejs/svelte-preprocess
   // for more information about preprocessors
   preprocess: preprocess(),

   kit: {
      // hydrate the <div id="svelte"> element in src/app.html
      target: '#svelte',
      vite: {
         resolve: {
            alias: {
               '~': resolve(__dirname, 'src'),
            }
         }
      }
   }
};

export default config;
