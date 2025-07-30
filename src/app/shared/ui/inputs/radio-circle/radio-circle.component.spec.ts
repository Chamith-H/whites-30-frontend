import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioCircleComponent } from './radio-circle.component';

describe('RadioCircleComponent', () => {
  let component: RadioCircleComponent;
  let fixture: ComponentFixture<RadioCircleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RadioCircleComponent]
    });
    fixture = TestBed.createComponent(RadioCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
