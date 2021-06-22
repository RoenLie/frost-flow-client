import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTabsHomeComponent } from './list-tabs-home.component';

describe('ListTabsHomeComponent', () => {
  let component: ListTabsHomeComponent;
  let fixture: ComponentFixture<ListTabsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTabsHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTabsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
