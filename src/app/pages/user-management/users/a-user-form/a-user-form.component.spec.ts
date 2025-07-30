import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AUserFormComponent } from './a-user-form.component';

describe('AUserFormComponent', () => {
  let component: AUserFormComponent;
  let fixture: ComponentFixture<AUserFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AUserFormComponent]
    });
    fixture = TestBed.createComponent(AUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
