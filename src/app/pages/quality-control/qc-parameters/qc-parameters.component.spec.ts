import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QcParametersComponent } from './qc-parameters.component';

describe('QcParametersComponent', () => {
  let component: QcParametersComponent;
  let fixture: ComponentFixture<QcParametersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QcParametersComponent]
    });
    fixture = TestBed.createComponent(QcParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
