import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AGatePassFormComponent } from './a-gate-pass-form.component';

describe('AGatePassFormComponent', () => {
  let component: AGatePassFormComponent;
  let fixture: ComponentFixture<AGatePassFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AGatePassFormComponent]
    });
    fixture = TestBed.createComponent(AGatePassFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
