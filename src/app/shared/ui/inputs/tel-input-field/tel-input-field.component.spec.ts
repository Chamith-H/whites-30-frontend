import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelInputFieldComponent } from './tel-input-field.component';

describe('TelInputFieldComponent', () => {
  let component: TelInputFieldComponent;
  let fixture: ComponentFixture<TelInputFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TelInputFieldComponent]
    });
    fixture = TestBed.createComponent(TelInputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
