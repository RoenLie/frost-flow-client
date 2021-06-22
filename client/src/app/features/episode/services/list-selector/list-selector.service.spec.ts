import { TestBed } from '@angular/core/testing';

import { ListSelectorService } from './list-selector.service';

describe('ListSelectorService', () => {
  let service: ListSelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListSelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
