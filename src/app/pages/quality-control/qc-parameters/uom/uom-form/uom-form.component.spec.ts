import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UomFormComponent } from './uom-form.component';

describe('UomFormComponent', () => {
  let component: UomFormComponent;
  let fixture: ComponentFixture<UomFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UomFormComponent]
    });
    fixture = TestBed.createComponent(UomFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
