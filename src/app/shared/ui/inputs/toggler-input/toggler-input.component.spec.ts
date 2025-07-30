import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TogglerInputComponent } from './toggler-input.component';

describe('TogglerInputComponent', () => {
  let component: TogglerInputComponent;
  let fixture: ComponentFixture<TogglerInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TogglerInputComponent]
    });
    fixture = TestBed.createComponent(TogglerInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
