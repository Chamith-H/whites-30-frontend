import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGatePassComponent } from './create-gate-pass.component';

describe('CreateGatePassComponent', () => {
  let component: CreateGatePassComponent;
  let fixture: ComponentFixture<CreateGatePassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateGatePassComponent]
    });
    fixture = TestBed.createComponent(CreateGatePassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
