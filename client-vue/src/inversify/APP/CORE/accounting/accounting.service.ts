import { injectable } from "inversify";


@injectable()
export class AccountingService {
   module = "core";
   doAccountingThings = () => console.log( 'doing core accounting things' );
}