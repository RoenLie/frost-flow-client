import { ContainerModule } from "inversify";
import { AccountingService } from "~/inversify/APP/CORE/accounting/accounting.service";
import { IntAccountingService } from "~/inversify/APP/INT/accounting/int.accounting.service";


export const intAccountingContainerModule = new ContainerModule( ( bind ) => {
   bind( AccountingService ).to( IntAccountingService );
} );