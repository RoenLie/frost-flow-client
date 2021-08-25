import { ContainerModule } from "inversify";
import { AccountingService } from "~/inversify/APP/CORE/accounting/accounting.service";
import { CusAccountingService } from "~/inversify/APP/CUS/accounting/cus.accounting.service";


export const cusAccountingContainerModule = new ContainerModule( ( bind ) => {
   bind( AccountingService ).to( CusAccountingService );
} );