import { readFileSync } from "fs";
import MagicString from 'magic-string';


export default function importOverriderPlugin(options = {
   verbose: true,
   sourceMap: true,
   entry: "C:/Programming/projects/frost-flow/frost-flow-client/client-react/src/overrides/index.ts"
}) {
   let overrides = {};

   return {
      // enforce: 'pre',
      name: 'import-overrider-plugin',

      buildStart() {
         const overrideData = readFileSync(options.entry);
         var ast = this.parse(overrideData);

         ast.body
            .filter((node) => !!node.type != 'ExportNamedDeclaration')
            .reduce((carrier, current) => [...carrier, ...current.specifiers], [])
            .forEach((specifier) => overrides[specifier.exported.name] = true);

         console.log("\nOverridden exports");
         console.log(overrides);
      },

      async transform(code, id) {
         const fileTypeRegex = /\.(ts|tsx|js|jsx)$/;
         if (!fileTypeRegex.test(id)) return null;
         // if (!/\home.page.tsx$/.test(id)) return null;

         try {
            var ast = this.parse(code);
         } catch (err) {
            this.warn({ code: 'PARSE_ERROR', message: ("import-overrider-plugin: failed to parse " + id) });
         }

         if (!ast) return null;

         let magicString = new MagicString(code);
         let hasChanged = false;

         // save only the body nodes that we care about.
         const relevantAstBodyNodes = [];
         ast.body.forEach((node, index) => {
            if (node.type != 'LabeledStatement') return;
            relevantAstBodyNodes.push(ast.body[index - 1]);
         });

         // go through the relevant body nodes and perform actions.
         relevantAstBodyNodes.forEach((node) => {
            const overridden = [];
            const standard = [];

            node.specifiers.forEach((specifier) => {
               const overrideExists = !!overrides[specifier.local.name];
               if (!overrideExists) {
                  standard.push(specifier.local.name);
                  return;
               }

               overridden.push(specifier.local.name);
            });

            if (!overridden.length) return;

            const importBuilder = [];
            importBuilder.push(`import {${overridden.join(',')}} from "overrides"`);
            importBuilder.push(`import {${standard.join(',')}} from ${node.source.raw}`);

            const newImports = importBuilder.join(';') + ';';

            if (overridden.length) {
               magicString.overwrite(node.start, node.end, newImports);
               hasChanged = true;
            }
         });

         if (!hasChanged) {
            return {
               code: code,
               ast: ast,
               map: options.sourceMap ? magicString.generateMap({ hires: true }) : null
            };
         }

         return {
            code: magicString.toString(),
            map: options.sourceMap ? magicString.generateMap({ hires: true }) : null
         };
      }
   };
};