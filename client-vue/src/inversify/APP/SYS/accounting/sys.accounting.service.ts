import { injectable } from "inversify";
import { AccountingService } from "~/inversify/APP/CORE/accounting/accounting.service";


@injectable()
export class SysAccountingService extends AccountingService {
   module = "sys";
   doAccountingThings = () => console.log( 'doing sys accounting things' );
}