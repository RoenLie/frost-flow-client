import { TestBed } from '@angular/core/testing';

import { InvManagerSubflowService } from './inv-manager-subflow.service';

describe('InvManagerSubflowService', () => {
  let service: InvManagerSubflowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvManagerSubflowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
