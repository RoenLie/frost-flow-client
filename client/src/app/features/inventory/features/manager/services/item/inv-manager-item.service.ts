import { api_getItems } from "@/app/api/dummy/invManager";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";


export interface Item {
  id: string | number;
  name: string;
}


@Injectable( { providedIn: "root" } )
export class InvManagerItemService {
  items: any[] = [];
  activeItem = new BehaviorSubject<Item>( this.items[ 0 ] );

  constructor () {
    ( async () => {
      const items = await api_getItems();
      if ( !items ) return;

      this.items = items;
      this.select( 0 );
    } )();
  }

  select( index: number ) { this.activeItem.next( this.items[ index ] ); }
}
