import { AfterViewInit, Component, ElementRef, forwardRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from "@angular/forms";


@Component( {
   selector: 'fl-input',
   templateUrl: 'fl-input.component.html',
   styleUrls: [ 'fl-input.component.scss' ],
   providers: [
      {
         provide: NG_VALUE_ACCESSOR,
         useExisting: forwardRef( () => FlInputComponent ),
         multi: true
      },
      {
         provide: NG_VALIDATORS,
         useExisting: forwardRef( () => FlInputComponent ),
         multi: true
      }
   ]
} )
export class FlInputComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {
   id: string = Math.random().toString( 36 ).substring( 2, 8 );

   @Input() label: string = "";
   @Input() placeholder: string = "";

   @Input() formControlName: string;
   get control() { return this.controlContainer?.control?.get( this.formControlName ); }

   #value: string;
   get value() { return this.#value; }
   set value( v: string ) { this.#value = v; this.onChange( v ); }

   @ViewChild( "input" ) inputEl: ElementRef<HTMLInputElement>;
   inputDisabled: boolean;
   #inputOnBlur: Function;

   constructor (
      private el: ElementRef,
      private rd: Renderer2,
      private controlContainer: ControlContainer ) { }
   ngOnInit() { }
   ngAfterViewInit() {
      this.#inputOnBlur = this.rd.listen( this.inputEl.nativeElement,
         "blur", ( e ) => { this.onTouch( e ); } );
   }
   validate = ( fc: FormControl ) => { };
   writeValue( value: any ) { if ( value !== undefined ) this.#value = value; }
   onChange = ( _: any ) => { };
   onTouch = ( _: any ) => { };
   registerOnChange( fn: any ) { this.onChange = fn; }
   registerOnTouched( fn: any ) { this.onTouch = fn; }
   setDisabledState( isDisabled: boolean ) { this.inputDisabled = isDisabled; }
   ngOnDestroy() { this.#inputOnBlur?.(); }
}