import { ContainerModule, injectable } from "inversify";
import { IQueryService } from "~/inversify/APP/CORE/modules/core.workspace.module";
import { IntQueryService2 } from "~/inversify/APP/INT/modules/int2.workspace.module";


@injectable()
export class CustomQueryService2 extends IntQueryService2 {
   override defaultDomain = "CUSTOM2";
   constructor () { super(); }
   override queryCompare( ...args: any[] ) {
      console.log( 'query compare has been overridden' );
      return super.queryCompare( ...args );
   }
}


export const module = new ContainerModule( ( bind ) => {
   bind<IQueryService>( IQueryService ).to( CustomQueryService2 );
} );