import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWeightComponent } from './view-weight.component';

describe('ViewWeightComponent', () => {
  let component: ViewWeightComponent;
  let fixture: ComponentFixture<ViewWeightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewWeightComponent]
    });
    fixture = TestBed.createComponent(ViewWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
