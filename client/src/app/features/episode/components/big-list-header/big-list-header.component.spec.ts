import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigListHeaderComponent } from './big-list-header.component';

describe('BigListHeaderComponent', () => {
  let component: BigListHeaderComponent;
  let fixture: ComponentFixture<BigListHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BigListHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BigListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
