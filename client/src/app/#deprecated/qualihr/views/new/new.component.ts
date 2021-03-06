import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroupDirective } from '@angular/forms';


import {
   MatSnackBar,
   MatSnackBarHorizontalPosition,
   MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


@Component( {
   selector: 'app-new',
   templateUrl: './new.component.html',
   styleUrls: [ './new.component.scss' ]
} )
export class NewComponent implements OnInit {
   categories: any[];
   formGroup = this.fb.group( {
      state: "new",
      category: "",
      title: "",
      description: "",
      stars: 0,
      favoritedBy: []
   } );

   horizontalPosition: MatSnackBarHorizontalPosition = 'center';
   verticalPosition: MatSnackBarVerticalPosition = 'top';

   constructor (
      private _snackBar: MatSnackBar,
      private fb: FormBuilder,
   ) { }

   ngOnInit(): void {
      this.categories = [
         { value: "office", viewValue: "Office" },
         { value: "recreational", viewValue: "Recreational" },
         { value: "leisure", viewValue: "Leisure" },
         { value: "tasks", viewValue: "Tasks" },
         { value: "community", viewValue: "Community" },
         { value: "other", viewValue: "Other" },
      ];
   }

   async submitSuggestion( formDirective: FormGroupDirective ) {
      if ( !this.formGroup.valid ) {
         this.openSnackBar( "Invalid form input!" );
         return;
      }

      try {
         // await this.firestore.collection("suggestions").add(this.formGroup.value);
      } catch ( error ) {
         console.error( error );
         return;
      }

      formDirective.resetForm();

      this.openSnackBar( "Suggestion submitted!" );
   }

   openSnackBar( msg: string ) {
      this._snackBar.open( msg, 'close', {
         duration: 3000,
         horizontalPosition: this.horizontalPosition,
         verticalPosition: this.verticalPosition,
      } );
   }
}
