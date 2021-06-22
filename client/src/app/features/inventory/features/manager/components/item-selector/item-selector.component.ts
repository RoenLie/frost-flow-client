import { Component } from '@angular/core';
import { InvManagerItemService } from "@features/inventory/features/manager/services/item/inv-manager-item.service";


@Component( {
   selector: "fl-item-selector",
   templateUrl: "item-selector.component.html",
   styleUrls: [ "item-selector.component.scss" ]
} )
export class ItemSelectorComponent {
   constructor ( public invItemService: InvManagerItemService ) { }
}
