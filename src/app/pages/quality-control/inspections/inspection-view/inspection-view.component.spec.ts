import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionViewComponent } from './inspection-view.component';

describe('InspectionViewComponent', () => {
  let component: InspectionViewComponent;
  let fixture: ComponentFixture<InspectionViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InspectionViewComponent]
    });
    fixture = TestBed.createComponent(InspectionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
