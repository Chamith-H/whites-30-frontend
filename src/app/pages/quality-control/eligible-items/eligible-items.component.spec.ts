import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EligibleItemsComponent } from './eligible-items.component';

describe('EligibleItemsComponent', () => {
  let component: EligibleItemsComponent;
  let fixture: ComponentFixture<EligibleItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EligibleItemsComponent]
    });
    fixture = TestBed.createComponent(EligibleItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
