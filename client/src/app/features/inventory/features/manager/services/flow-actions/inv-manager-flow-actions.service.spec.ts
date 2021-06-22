import { TestBed } from '@angular/core/testing';

import { InvManagerFlowActionsService } from './inv-manager-flow-actions.service';

describe('InvManagerFlowActionsService', () => {
  let service: InvManagerFlowActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvManagerFlowActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
