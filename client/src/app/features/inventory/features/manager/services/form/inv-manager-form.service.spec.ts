import { TestBed } from '@angular/core/testing';

import { InvManagerFormService } from './inv-manager-form.service';

describe('InvManagerFormService', () => {
  let service: InvManagerFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvManagerFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
