import { IToastComponent } from "features/toast";
import { uuid } from "shared";


export class ToastPortalService {
   toasts: IToastComponent[] = [];
   setToasts: Function = () => { };
   bind( toasts: IToastComponent[], setToasts: Function ) {
      this.toasts = toasts;
      this.setToasts = setToasts;
   }
   addMessage( toast: IToastComponent ) {
      this.setToasts( [ ...this.toasts, { id: uuid(), ...toast } ] );
   }
}

export const rootToastService = new ToastPortalService();