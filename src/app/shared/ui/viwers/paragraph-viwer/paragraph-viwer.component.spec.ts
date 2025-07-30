import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParagraphViwerComponent } from './paragraph-viwer.component';

describe('ParagraphViwerComponent', () => {
  let component: ParagraphViwerComponent;
  let fixture: ComponentFixture<ParagraphViwerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParagraphViwerComponent]
    });
    fixture = TestBed.createComponent(ParagraphViwerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
