import { Injectable } from '@angular/core';
import { Type } from '@angular/core';


export class Layout { constructor ( public component: Type<any>, public data: any ) { } }


@Injectable( { providedIn: "root" } )
export class LayoutService {
  layouts: any = {
    default: async () => {
      const component = ( await import( "./default/default.component" ) ).DefaultComponent;
      return new Layout( component, { name: "default" } );
    },
    enigma: async () => {
      const component = ( await import( "./enigma/enigma.component" ) ).EnigmaComponent;
      return new Layout( component, { name: "enigma" } );
    }
  };
  async getLayout( layout: string = "default" ) {
    return await this.layouts[ layout ]();
  }
}
