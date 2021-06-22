import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTabsComponent } from './list-tabs.component';

describe('ListTabsComponent', () => {
  let component: ListTabsComponent;
  let fixture: ComponentFixture<ListTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
