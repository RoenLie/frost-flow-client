import { injectable } from "inversify";
import { AccountingService } from "~/inversify/APP/CORE/accounting/accounting.service";


@injectable()
export class CusAccountingService extends AccountingService {
   module = "cus";
   doAccountingThings = () => console.log( 'doing cus accounting things' );
}