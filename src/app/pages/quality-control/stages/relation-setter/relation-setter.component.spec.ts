import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationSetterComponent } from './relation-setter.component';

describe('RelationSetterComponent', () => {
  let component: RelationSetterComponent;
  let fixture: ComponentFixture<RelationSetterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RelationSetterComponent]
    });
    fixture = TestBed.createComponent(RelationSetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
