import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGatePassComponent } from './view-gate-pass.component';

describe('ViewGatePassComponent', () => {
  let component: ViewGatePassComponent;
  let fixture: ComponentFixture<ViewGatePassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewGatePassComponent]
    });
    fixture = TestBed.createComponent(ViewGatePassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
