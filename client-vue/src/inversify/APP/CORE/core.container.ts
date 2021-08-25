import { Container, injectable, inject, multiInject } from "inversify";
import { AccountingService } from "~/inversify/APP/CORE/accounting/accounting.service";
import { accountingContainerModule } from "~/inversify/APP/CORE/plugins/accounting.module";

console.log( 'core accounting container' );

export interface IContainerInstaller {
   layer: symbol;
   module: symbol;
   class: any;
}

@injectable()
export class AccountingListContext {
   @multiInject( AccountingService ) accountingService: AccountingService;
}

const coreContainer = new Container();
coreContainer.load( accountingContainerModule );

// const sysPlugins = import.meta.globEager( "/src/inversify/APP/SYS/**/*" );
// Object.values( sysPlugins ).forEach( plugin => {
//    const installer = plugin.install?.() as IContainerInstaller;
//    if ( !installer ) return;

//    accountingContainer
//       .bind( installer.layer )
//       .to( installer.class )
//       .whenTargetIsDefault();
// } );


export { coreContainer as container };