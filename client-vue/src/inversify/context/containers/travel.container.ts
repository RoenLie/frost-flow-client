import { Container } from "inversify";
import { invoiceContainer } from "~/inversify/context/containers/invoice.container";
import { CostInvoice, Travel } from "~/inversify/context/entities";
import { TYPES } from "~/inversify/context/types";

const travelContainer = new Container();
travelContainer.parent = invoiceContainer;
travelContainer.bind<Travel>( TYPES.Workflow ).to( Travel );
travelContainer.bind<CostInvoice>( TYPES.Workflow ).to( CostInvoice );

const integrations = import.meta.globEager( "../plugins/*.travel.*" );
Object.values( integrations ).forEach( int => {
   int.install?.();
} );

export { travelContainer };