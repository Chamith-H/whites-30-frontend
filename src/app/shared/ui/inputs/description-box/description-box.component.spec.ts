import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionBoxComponent } from './description-box.component';

describe('DescriptionBoxComponent', () => {
  let component: DescriptionBoxComponent;
  let fixture: ComponentFixture<DescriptionBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DescriptionBoxComponent]
    });
    fixture = TestBed.createComponent(DescriptionBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
