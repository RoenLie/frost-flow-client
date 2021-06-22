import { TestBed } from '@angular/core/testing';

import { RecordTabsService } from './record-tabs.service';

describe('RecordTabsService', () => {
  let service: RecordTabsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecordTabsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
