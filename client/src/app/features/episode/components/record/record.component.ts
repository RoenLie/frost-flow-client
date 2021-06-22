import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { RecordForm, RecordService } from "@features/episode/services/record/record.service";
import { type } from "@shared/utilities/type";


@Component( {
   selector: "epi-record",
   templateUrl: "record.component.html",
   styleUrls: [ "record.component.scss" ]
} )
export class RecordComponent implements OnInit {
   formGroup: FormGroup;
   form: RecordForm | null;
   constructor ( private recordService: RecordService, private fb: FormBuilder ) {
      this.recordService.form.subscribe( form => this.formSubscription( form ) );
   }

   ngOnInit(): void { }

   createForm = ( fb: any, form: any ) => fb[ "group" ]( form );
   formSubscription( form: RecordForm | null ) {
      this.form = form;

      if ( !this.form ) { this.formGroup = new FormGroup( {} ); return; };

      for ( const key in this.form.groupConfig ) {
         if ( !this.form.data[ key ] ) return;

         if ( type( this.form.groupConfig[ key ][ 0 ] ) == "Object" ) {
            this.form.groupConfig[ key ][ 0 ] = {
               ...this.form.groupConfig[ key ][ 0 ],
               value: this.form.data[ key ]
            };
         } else {
            this.form.groupConfig[ key ][ 0 ] = this.form.data[ key ];
         }
      }

      this.formGroup = this.createForm( this.fb, form?.groupConfig );

      if ( this.form.formConfig.disabled ) this.formGroup.disable();
   }
}
