import { ContainerModule, injectable } from "inversify";
import { IQueryService, QueryService } from "features/inversify/APP/CORE/modules/core.workspace.module";


@injectable()
export class IntQueryService1 extends QueryService {
   override defaultDomain = "INT1";
   constructor () { super(); }
   override queryCompare( ...args: any[] ) {
      console.log( 'query compare has been overridden' );
      return super.queryCompare( ...args );
   }
}


export const module = new ContainerModule( ( bind ) => {
   bind<IQueryService>( IQueryService ).to( IntQueryService1 );
} );