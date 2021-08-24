import { Container } from "inversify";
import { invoiceContainer } from "~/inversify/context/containers/invoice.container";
import { CostInvoice } from "~/inversify/context/entities";
import { TYPES } from "~/inversify/context/types";

const costInvoiceContainer = new Container();
costInvoiceContainer.parent = invoiceContainer;
costInvoiceContainer.bind<CostInvoice>( TYPES.Workflow ).to( CostInvoice );
export { costInvoiceContainer };