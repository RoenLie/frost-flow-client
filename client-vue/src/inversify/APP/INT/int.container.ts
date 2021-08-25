import { container as sysContainer } from "~/inversify/APP/SYS/sys.container";
import { intAccountingContainerModule } from "~/inversify/APP/INT/plugins/int.accounting.module";

export const container = sysContainer.createChild();
container.load( intAccountingContainerModule );