import { Injectable } from '@angular/core';

@Injectable( { providedIn: "root" } )
export class DefaultLayoutService {
  navigationLeftOpen: boolean = false;
  navigationRightOpen: boolean = false;
}
