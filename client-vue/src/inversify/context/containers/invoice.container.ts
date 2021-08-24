import { Container } from "inversify";
import { Invoice, ModuleContext } from "~/inversify/context/entities";
import { TYPES } from "~/inversify/context/types";

const invoiceContainer = new Container();
invoiceContainer.bind<Invoice>( TYPES.Workflow ).to( Invoice );
invoiceContainer.bind<ModuleContext>( TYPES.Context ).to( ModuleContext );
export { invoiceContainer };