import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageViwerComponent } from './image-viwer.component';

describe('ImageViwerComponent', () => {
  let component: ImageViwerComponent;
  let fixture: ComponentFixture<ImageViwerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageViwerComponent]
    });
    fixture = TestBed.createComponent(ImageViwerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
