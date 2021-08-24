export interface IWorkflowContext {
   module: string;
}

export interface IInvoiceContext extends IWorkflowContext {
   doInvoiceMethod: () => void;
}
export interface ICostInvoiceContext extends IWorkflowContext {
   doCostInvoiceMethod: () => void;
}
export interface ITravelContext extends IWorkflowContext {
   doTravelMethod: () => void;
}
