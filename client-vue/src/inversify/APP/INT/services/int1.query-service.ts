import { injectable } from "inversify";
import { QueryService } from "~/inversify/APP/CORE/services/core.query-service";


@injectable()
export class IntQueryService1 extends QueryService {
   override defaultDomain = "INT1";
   constructor () { super(); }
   override queryCompare( ...args: any[] ) {
      console.log( 'query compare has been overridden' );
      return super.queryCompare( ...args );
   }
}