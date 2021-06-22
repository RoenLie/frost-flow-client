import { api_getFlows } from "@/app/api/dummy/invManager";
import { Injectable, OnDestroy } from '@angular/core';
import { InvManagerItemService } from "@features/inventory/features/manager/services/item/inv-manager-item.service";
import { objValueEquals } from "@shared/utilities/objValueEquals";
import { BehaviorSubject, Subscription } from "rxjs";


export interface Flow {
   id: string | number;
   itemId: string | number;
   name: string;
}


@Injectable( { providedIn: 'root' } )
export class InvManagerFlowService implements OnDestroy {
   flows: any[] = [];
   activeFlow = new BehaviorSubject<Flow | undefined>( this.flows[ 0 ] );
   subscriptions: Subscription[] = [];

   constructor ( private invMngItemService: InvManagerItemService ) {
      const invSub = this.invMngItemService.activeItem.subscribe( async ( item ) => {
         if ( !item?.id ) {
            this.activeFlow.next( undefined );
            return;
         }

         const flows = await api_getFlows( item?.id );
         if ( !flows ) return;

         const isEqual = objValueEquals( this.flows, flows );
         if ( isEqual ) return;

         this.flows = flows;

         if ( !this.activeFlow.value ) { this.select( 0 ); return; }

         const currentIndex = this.flows
            .findIndex( fl => fl.id == this.activeFlow.value?.id );

         if ( currentIndex > -1 ) { this.select( currentIndex ); return; }

         this.select( 0 );
      } );

      this.subscriptions.push( invSub );
   }

   select( index: number ) { this.activeFlow.next( this.flows[ index ] ); }
   ngOnDestroy() { this.subscriptions.forEach( sub => sub?.unsubscribe() ); }
}
