import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleImageUploaderComponent } from './single-image-uploader.component';

describe('SingleImageUploaderComponent', () => {
  let component: SingleImageUploaderComponent;
  let fixture: ComponentFixture<SingleImageUploaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleImageUploaderComponent]
    });
    fixture = TestBed.createComponent(SingleImageUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
