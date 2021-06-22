import { Injectable } from '@angular/core';
// import { HotToastService } from "@ngneat/hot-toast";

interface FlowAction {
   name: string;
   svgPath: string;
   function(): void;
}


@Injectable( { providedIn: 'root' } )
export class InvManagerFlowActionsService {
   actions: FlowAction[] = [];

   constructor ( /*private toastService: HotToastService*/ ) {
      this.generateFlowActions();
   }


   generateFlowActions() {
      const generateFlowAction = () => {
         const name = "action";
         const svgPath = "assets/svg/save-solid.svg";

         return {
            name,
            svgPath,
            function: () => {
               //  this.toastService.success( name );
            }
         };
      };

      for ( let i = 0; i < 5; i++ ) {
         this.actions.push( generateFlowAction() );
      }
   }
}
