import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ARoleFormComponent } from './a-role-form.component';

describe('ARoleFormComponent', () => {
  let component: ARoleFormComponent;
  let fixture: ComponentFixture<ARoleFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ARoleFormComponent]
    });
    fixture = TestBed.createComponent(ARoleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
