import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
// import { HotToastModule } from '@ngneat/hot-toast';

import { LayoutModule } from "@core/layouts/layout.module";
import { BrandService } from "@core/services/brand.service";
import { AuthService } from "@core/services/auth.service";
import { AppComponent } from "@/app/app.component";
import { AppRoutingModule } from "@/app/app-routing.module";

@NgModule( {
   declarations: [
      AppComponent,
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      AppRoutingModule,
      LayoutModule,
      HttpClientModule,
      AngularSvgIconModule.forRoot(),
      //  HotToastModule.forRoot(),
   ],
   providers: [ AuthService ],
   bootstrap: [ AppComponent ]
} )
export class AppModule {
   constructor ( private brandService: BrandService ) { }
}
