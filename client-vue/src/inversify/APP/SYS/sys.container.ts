import { sysAccountingContainerModule } from "~/inversify/APP/SYS/plugins/sys.accounting.module";
import { container as coreContainer } from "~/inversify/APP/CORE/core.container";

export const container = coreContainer.createChild();
container.load( sysAccountingContainerModule );