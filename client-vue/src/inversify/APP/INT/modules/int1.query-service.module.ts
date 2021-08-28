import { ContainerModule } from "inversify";
import { IQueryService } from "~/inversify/APP/CORE/services/core.query-service";
import { IntQueryService1 } from "~/inversify/APP/INT/services/int1.query-service";


export const containerModule = new ContainerModule( ( bind ) => {
   bind( IQueryService ).to( IntQueryService1 );
} );