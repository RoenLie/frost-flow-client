import { api_getSubflows } from "@/app/api/dummy/invManager";
import { Injectable, OnDestroy } from '@angular/core';
import { InvManagerFlowService } from "@features/inventory/features/manager/services/flow/inv-manager-flow.service";
import { objValueEquals } from "@shared/utilities/objValueEquals";
import { BehaviorSubject, Subscription } from "rxjs";


export type SubflowStatus = "complete" | "ongoing" | "error";
export interface Subflow {
  id: string | number;
  name: string;
  flowId: string | number;
  iconPath: string;
  status: SubflowStatus;
}


@Injectable( { providedIn: 'root' } )
export class InvManagerSubflowService implements OnDestroy {
  subflows: Subflow[] = [];
  activeSubflow = new BehaviorSubject<Subflow>( this.subflows[ 0 ] );
  subscriptions: Subscription[] = [];
  awaitingRefresh: boolean = false;

  constructor ( private invMngFlowService: InvManagerFlowService ) {
    const flowSub = this.invMngFlowService.activeFlow.subscribe( async ( flow ) => {
      if ( !flow?.id ) return;

      const subflows = await api_getSubflows( flow?.id );
      if ( !subflows ) return;

      const isEqual = objValueEquals( this.subflows, subflows );
      if ( isEqual ) return;

      this.subflows = subflows;

      if ( !this.activeSubflow.value ) { this.select( 0 ); return; }

      const currentIndex = this.subflows
        .findIndex( sf => sf.id == this.activeSubflow.value.id );

      if ( currentIndex > -1 ) { this.select( currentIndex ); return; }

      this.select( 0 );
    } );

    this.subscriptions.push( flowSub );
  }

  select( index: number ) { this.activeSubflow.next( this.subflows[ index ] ); }
  async refresh() {
    const previousId = this.activeSubflow.value.id;
    if ( !previousId ) return;

    const currentFlow = this.invMngFlowService.activeFlow.value;
    if ( !currentFlow ) return;

    const subflows = await api_getSubflows( currentFlow.id );
    if ( !subflows ) return;

    this.subflows = subflows;

    const subflow = this.subflows.find( sf => sf.id == previousId );
    if ( !subflow ) return;

    this.activeSubflow.next( subflow );
  }
  ngOnDestroy() { this.subscriptions.forEach( sub => sub?.unsubscribe() ); }
}