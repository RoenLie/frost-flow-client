import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { RecordForm, RecordService } from "@features/episode/services/record/record.service";
import { Subscription } from "rxjs";


@Component( {
   selector: "epi-record",
   templateUrl: "record.component.html",
   styleUrls: [ "record.component.scss" ]
} )
export class RecordComponent implements OnInit, OnDestroy {
   formGroup: FormGroup;
   form: RecordForm | null;
   formSub: Subscription;


   constructor ( private recordService: RecordService, private fb: FormBuilder ) {
      this.formSub = this.recordService.form.subscribe( form => this.formSubscription( form ) );
   }


   ngOnInit(): void { }

   ngOnDestroy(): void {
      this.formSub.unsubscribe();
   }


   createForm = ( fb: any, form: any ) => fb[ "group" ]( form );


   formSubscription( form: RecordForm | null ) {
      this.form = form;

      if ( !this.form ) { this.formGroup = new FormGroup( {} ); return; };

      this.formGroup = this.createForm( this.fb, form?.groupConfig );

      if ( this.form.formConfig.disabled ) this.formGroup.disable();
   }
}
