import { uuid } from "shared";


export class ToastPortalService {
   toasts: any[] = [];
   setToasts: Function = () => { };
   bind( toasts: any[], setToasts: Function ) {
      this.toasts = toasts;
      this.setToasts = setToasts;
   }
   addMessage( toast: any ) {
      this.setToasts( [ ...this.toasts, { id: uuid(), ...toast } ] );
   }
}

export const rootToastService = new ToastPortalService();