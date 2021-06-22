import { TestBed } from '@angular/core/testing';

import { InvManagerFlowService } from './inv-manager-flow.service';

describe('InvManagerFlowService', () => {
  let service: InvManagerFlowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvManagerFlowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
