import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionConfComponent } from './inspection-conf.component';

describe('InspectionConfComponent', () => {
  let component: InspectionConfComponent;
  let fixture: ComponentFixture<InspectionConfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InspectionConfComponent]
    });
    fixture = TestBed.createComponent(InspectionConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
