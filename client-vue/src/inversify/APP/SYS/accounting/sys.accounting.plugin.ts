import { injectable } from "inversify";
import { LAYER, MODULE } from "~/inversify/CORE/accounting.container";

@injectable()
export class Accounting {
   module = "sys";
   doAccountingThings = () => console.log( 'doing sys accounting things' );
}


export const install = () => {
   return { class: Accounting, layer: LAYER.System, module: MODULE.Accounting };
};