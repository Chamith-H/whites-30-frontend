import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetActionComponent } from './get-action.component';

describe('GetActionComponent', () => {
  let component: GetActionComponent;
  let fixture: ComponentFixture<GetActionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetActionComponent]
    });
    fixture = TestBed.createComponent(GetActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
