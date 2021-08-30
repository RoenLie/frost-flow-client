import { ContainerModule, injectable } from "inversify";
import { IQueryService, QueryService } from "features/inversify/APP/CORE/modules/core.workspace.module";
import { IntQueryService1 } from "features/inversify/APP/INT/modules/int1.workspace.module";


@injectable()
export class CustomQueryService1 extends IntQueryService1 {
   override defaultDomain = "CUSTOM1";
   constructor () { super(); }
   override queryCompare( ...args: any[] ) {
      console.log( 'query compare has been overridden' );
      return super.queryCompare( ...args );
   }
}


export const module = new ContainerModule( ( bind ) => {
   bind<IQueryService>( IQueryService ).to( CustomQueryService1 );
} );