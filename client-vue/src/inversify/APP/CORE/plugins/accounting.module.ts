import { ContainerModule } from "inversify";
import { AccountingService } from "~/inversify/APP/CORE/accounting/accounting.service";


export const accountingContainerModule = new ContainerModule( ( bind ) => {
   bind( AccountingService ).to( AccountingService );
} );