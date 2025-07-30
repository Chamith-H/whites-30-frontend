import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGatePassComponent } from './edit-gate-pass.component';

describe('EditGatePassComponent', () => {
  let component: EditGatePassComponent;
  let fixture: ComponentFixture<EditGatePassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditGatePassComponent]
    });
    fixture = TestBed.createComponent(EditGatePassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
