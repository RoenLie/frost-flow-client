import { api_saveForm, api_submitForm } from "@/app/api/dummy/invManager";
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Form, InvManagerFormService } from "@features/inventory/features/manager/services/form/inv-manager-form.service";
import { InvManagerSubflowService } from "@features/inventory/features/manager/services/subflow/inv-manager-subflow.service";
import { type } from "@shared/utilities/type";


@Component( {
   selector: "fl-flow-form",
   templateUrl: "flow-form.component.html",
   styleUrls: [ "flow-form.component.scss" ]
} )
export class FlowFormComponent implements OnInit {
   formGroup: FormGroup;
   form: Form | undefined;
   constructor (
      private formService: InvManagerFormService,
      public subflowService: InvManagerSubflowService,
      private fb: FormBuilder
   ) { }
   ngOnInit(): void {
      this.formService.activeForm.subscribe( form => {
         this.form = form;

         if ( !this.form ) { this.formGroup = new FormGroup( {} ); return; };

         for ( const key in this.form.formGroup ) {
            if ( !this.form.formData[ key ] ) return;

            if ( type( this.form.formGroup[ key ][ 0 ] ) == "Object" ) {
               this.form.formGroup[ key ][ 0 ] = {
                  ...this.form.formGroup[ key ][ 0 ],
                  value: this.form.formData[ key ]
               };
            } else {
               this.form.formGroup[ key ][ 0 ] = this.form.formData[ key ];
            }
         }

         this.formGroup = this.createForm( this.fb, form?.formGroup );

         if ( this.form.formInfo.disabled ) this.formGroup.disable();
      } );
   }
   createForm = ( fb: any, form: any ) => fb[ "group" ]( form );
   save() {
      if ( !this.form ) return;
      api_saveForm( this.form.subflowID, this.form.id, this.formGroup );
   }
   async submit() {
      if ( !this.form ) return;
      await api_submitForm( this.form.subflowID, this.form.id, this.formGroup );

      this.subflowService.refresh();
   }
}
