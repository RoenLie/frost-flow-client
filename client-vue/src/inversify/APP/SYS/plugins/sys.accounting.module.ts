import { ContainerModule } from "inversify";
import { SysAccountingService } from "~/inversify/APP/SYS/accounting/sys.accounting.service";
import { AccountingService } from "~/inversify/APP/CORE/accounting/accounting.service";


export const sysAccountingContainerModule = new ContainerModule( ( bind ) => {
   bind( AccountingService ).to( SysAccountingService );
} );