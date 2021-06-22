import { EsCardComponent } from "@/app/#deprecated/eyeshare/core/components/es-card/es-card.component";
import { EsBaseComponent, EsComponentDeps } from "@/app/#deprecated/eyeshare/core/helpers/component-decorators";
import { LoggerService } from "@/app/#deprecated/eyeshare/core/services/logger.service";
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';


@EsBaseComponent()
@EsComponentDeps( { directives: [ EsCardComponent ] } )
@Component( {
   selector: "es-lines",
   templateUrl: "es-lines.component.html",
   styleUrls: [ "es-lines.component.scss" ],
} )
export class EsLinesComponent implements OnInit, AfterViewInit {

   message: string = "Initial message";

   constructor ( public logger?: LoggerService ) { }

   ngOnInit() { }
   ngAfterViewInit() { }
}


@NgModule( {
   imports: [
      CommonModule,
      FormsModule,
   ],
   declarations: [
      EsLinesComponent
   ],
   providers: [],
   exports: [],
   schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
} )
export class EsLinesModule { }