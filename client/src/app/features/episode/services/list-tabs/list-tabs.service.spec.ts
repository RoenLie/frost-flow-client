import { TestBed } from "@angular/core/testing";

import { ListTabsService } from "./list-tabs.service";

describe( "ListTabsService", () => {
   let service: ListTabsService;

   beforeEach( () => {
      TestBed.configureTestingModule( {} );
      service = TestBed.inject( ListTabsService );
   } );

   it( "should be created", () => {
      expect( service ).toBeTruthy();
   } );
} );
