import { TestBed } from '@angular/core/testing';

import { InvManagerItemService } from './inv-manager-item.service';

describe('InvManagerItemService', () => {
  let service: InvManagerItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvManagerItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
