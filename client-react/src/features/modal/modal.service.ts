import { IModalWrapperProps } from "features/modal";
import { uuid } from "shared";


export class ModalPortalService {
   modals: any[] = [];
   setModals: Function = () => { };
   bind( modals: any[], setModals: Function ) {
      this.modals = modals;
      this.setModals = setModals;
   }
   addModal( options: IModalWrapperProps ) {
      options = {
         ...options,
         resizeable: options.resizeable != undefined ? options.resizeable : true,
         moveable: options.moveable != undefined ? options.moveable : true,
         size: options.size != undefined ? options.size : 'large',
      };

      console.log( options );

      this.setModals( [ ...this.modals, { ...options, id: uuid(), } ] );
   }
}

export const rootModalService = new ModalPortalService();