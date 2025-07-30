import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentViwerComponent } from './document-viwer.component';

describe('DocumentViwerComponent', () => {
  let component: DocumentViwerComponent;
  let fixture: ComponentFixture<DocumentViwerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentViwerComponent]
    });
    fixture = TestBed.createComponent(DocumentViwerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
