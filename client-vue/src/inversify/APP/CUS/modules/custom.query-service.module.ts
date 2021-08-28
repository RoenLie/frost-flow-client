import { ContainerModule } from "inversify";
import { parentIs, parentIsNot } from "~/inversify/APP/CORE/features/parentIs";
import { IQueryService } from "~/inversify/APP/CORE/services/core.query-service";
import { CustomInt1QueryService, CustomInt2QueryService, CustomQueryService } from "~/inversify/APP/CUS/services/custom.query-service";
import { container as int1Container } from "~/inversify/APP/INT/int1.container";
import { container as int2Container } from "~/inversify/APP/INT/int2.container";


export const containerModule = new ContainerModule( ( bind ) => {

   // bind<IQueryService>( IQueryService ).to( CustomQueryService );
   // bind<IQueryService>( IQueryService ).to( CustomInt1QueryService )
   //    .when( parentIsNot( [ int1Container, int2Container ] ) );
   bind<IQueryService>( IQueryService ).to( CustomInt1QueryService )
      .when( parentIs( int1Container ) );
   bind<IQueryService>( IQueryService ).to( CustomInt2QueryService )
      .when( parentIs( int2Container ) );
} );