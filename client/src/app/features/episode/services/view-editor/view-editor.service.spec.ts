import { TestBed } from '@angular/core/testing';

import { ViewEditorService } from './view-editor.service';

describe('ViewEditorService', () => {
  let service: ViewEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
