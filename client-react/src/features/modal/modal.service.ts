import { uuid } from "shared";


export class ModalPortalService {
   modals: any[] = [];
   setModals: Function = () => { };
   bind( modals: any[], setModals: Function ) {
      this.modals = modals;
      this.setModals = setModals;
   }
   addModal( modal: any, options = {} as any ) {
      const { moveable = true, resizeable = true, size = 'large' } = options;
      this.setModals( [ ...this.modals, { component: modal, id: uuid(), moveable, resizeable, size } ] );
   }
}

export const rootModalService = new ModalPortalService();