import { ContainerModule, injectable } from "inversify";
import { IQueryService, QueryService } from "~/inversify/APP/CORE/modules/core.workspace.module";


@injectable()
export class CustomQueryService extends QueryService {
   override defaultDomain = "CUSTOM";
   constructor () { super(); }
   override queryCompare( ...args: any[] ) {
      console.log( 'query compare has been overridden' );
      return super.queryCompare( ...args );
   }
}


export const module = new ContainerModule( ( bind ) => {
   bind<IQueryService>( IQueryService ).to( CustomQueryService );
} );