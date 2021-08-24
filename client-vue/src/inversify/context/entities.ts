import "reflect-metadata";
import { injectable, inject, multiInject } from "inversify";
import { ICostInvoiceContext, IInvoiceContext, ITravelContext, IWorkflowContext } from "~/inversify/context/interfaces";
import { TYPES } from "~/inversify/context/types";


@injectable()
export class ModuleContext {
   private _moduleContext: IWorkflowContext;
   constructor (
      @inject( TYPES.Workflow ) moduleContext: IWorkflowContext
   ) {
      this._moduleContext = moduleContext;
      console.log( this._moduleContext );
   }
}











@injectable()
export class Invoice implements IInvoiceContext {
   doInvoiceMethod = () => console.log( 'random invoice method' );
   module = "invoice";
}

@injectable()
export class CostInvoice extends Invoice implements ICostInvoiceContext {
   constructor () {
      super();
   }
   doCostInvoiceMethod = () => console.log( 'random cost invoice method' );
   module = "costinvoice";
}

@injectable()
export class Travel extends Invoice implements ITravelContext {
   constructor () {
      super();
   }
   doTravelMethod = () => console.log( 'random travel method' );
   module = "travel";

}