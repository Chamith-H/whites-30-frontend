import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailHeadComponent } from './detail-head.component';

describe('DetailHeadComponent', () => {
  let component: DetailHeadComponent;
  let fixture: ComponentFixture<DetailHeadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailHeadComponent]
    });
    fixture = TestBed.createComponent(DetailHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
