import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightRecordComponent } from './weight-record.component';

describe('WeightRecordComponent', () => {
  let component: WeightRecordComponent;
  let fixture: ComponentFixture<WeightRecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeightRecordComponent]
    });
    fixture = TestBed.createComponent(WeightRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
