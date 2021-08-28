import { injectable } from "inversify";
import { QueryService } from "~/inversify/APP/CORE/services/core.query-service";


@injectable()
export class CustomInt1QueryService extends QueryService {
   override defaultDomain = "CUSTOM-INT1";
   constructor () { super(); }
   override queryCompare( ...args: any[] ) {
      console.log( 'query compare has been overridden' );
      return super.queryCompare( ...args );
   }
}
@injectable()
export class CustomInt2QueryService extends QueryService {
   override defaultDomain = "CUSTOM-INT2";
   constructor () { super(); }
   override queryCompare( ...args: any[] ) {
      console.log( 'query compare has been overridden' );
      return super.queryCompare( ...args );
   }
}
@injectable()
export class CustomQueryService extends QueryService {
   override defaultDomain = "CUSTOM";
   constructor () { super(); }
   override queryCompare( ...args: any[] ) {
      console.log( 'query compare has been overridden' );
      return super.queryCompare( ...args );
   }
}