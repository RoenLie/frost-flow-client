import { api_getForm } from "@/app/api/dummy/invManager";
import { Injectable, OnDestroy } from '@angular/core';
import { InvManagerSubflowService } from "@features/inventory/features/manager/services/subflow/inv-manager-subflow.service";
import { GUID } from "@shared/utilities/guid";
import { objValueEquals } from "@shared/utilities/objValueEquals";
import { BehaviorSubject, Subscription } from "rxjs";


export interface Form {
  id: GUID;
  subflowID: GUID;
  name: string;
  formInfo: any;
  formControlsInfo: any;
  formData: any;
  formGroup: any;
}


@Injectable( { providedIn: 'root' } )
export class InvManagerFormService implements OnDestroy {
  activeForm = new BehaviorSubject<Form | undefined>( undefined );
  subscriptions: Subscription[] = [];
  awaitingRefresh: boolean;

  constructor ( private subflowService: InvManagerSubflowService ) {
    const subflowSub = this.subflowService.activeSubflow.subscribe( async ( subflow ) => {
      if ( !subflow?.id ) {
        this.activeForm.next( undefined );
        return;
      }

      const form = await api_getForm( subflow?.id );

      if ( !form ) {
        this.activeForm.next( undefined );
        return;
      }

      const isEqual = objValueEquals( this.activeForm.value, form );

      if ( isEqual && subflow.status != "complete" ) return;

      this.activeForm.next( form );
    } );

    this.subscriptions.push( subflowSub );
  }
  ngOnDestroy() { this.subscriptions.forEach( sub => sub.unsubscribe() ); }
}

