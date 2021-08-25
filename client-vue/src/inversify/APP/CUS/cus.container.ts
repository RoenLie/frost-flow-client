import { cusAccountingContainerModule } from "~/inversify/APP/CUS/plugins/cus.accounting.module";
import { container as intContainer } from "~/inversify/APP/INT/int.container";

export const container = intContainer.createChild();
container.load( cusAccountingContainerModule );