import { ContainerModule } from "inversify";
import { IQueryService, QueryService } from "~/inversify/APP/CORE/services/core.query-service";


export const containerModule = new ContainerModule( ( bind ) => {
   bind<IQueryService>( IQueryService ).to( QueryService );
} );