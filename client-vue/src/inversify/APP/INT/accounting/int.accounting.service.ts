import { injectable } from "inversify";
import { AccountingService } from "~/inversify/APP/CORE/accounting/accounting.service";


@injectable()
export class IntAccountingService extends AccountingService {
   module = "int";
   doAccountingThings = () => console.log( 'doing int accounting things' );
}