import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ARoleViewComponent } from './a-role-view.component';

describe('ARoleViewComponent', () => {
  let component: ARoleViewComponent;
  let fixture: ComponentFixture<ARoleViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ARoleViewComponent]
    });
    fixture = TestBed.createComponent(ARoleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
