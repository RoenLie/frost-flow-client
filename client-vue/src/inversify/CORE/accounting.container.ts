import { Container, ContainerModule } from "inversify";

console.log( 'core accounting container' );

// export const LAYER = new Map();
// LAYER.set( "Core", Symbol( 'core' ) );
// LAYER.set( "System", Symbol( 'system' ) );
// LAYER.set( "Integration", Symbol( 'integration' ) );
// LAYER.set( "Custom", Symbol( 'custom' ) );

export interface IContainerInstaller {
   layer: symbol;
   module: symbol;
   class: any;
}

export const LAYER = {
   Core: Symbol( 'core' ),
   System: Symbol( 'system' ),
   Integration: Symbol( 'integration' ),
   Custom: Symbol( 'custom' )
};

export const MODULE = {
   Accounting: Symbol( 'accounting' ),
   Invoice: Symbol( 'invoice' ),
   CostInvoice: Symbol( 'costinvoice' )
};

Object.freeze( LAYER );
Object.freeze( MODULE );


const coreContainerModule = new ContainerModule();











const accountingContainer = new Container();

const sysPlugins = import.meta.globEager( "/src/inversify/APP/SYS/**/*" );
Object.values( sysPlugins ).forEach( plugin => {
   const installer = plugin.install?.() as IContainerInstaller;
   if ( !installer ) return;

   accountingContainer
      .bind( installer.layer )
      .to( installer.class )
      .whenTargetIsDefault();
} );

export { accountingContainer };