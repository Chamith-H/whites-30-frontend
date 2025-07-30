import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleGatherComponent } from './sample-gather.component';

describe('SampleGatherComponent', () => {
  let component: SampleGatherComponent;
  let fixture: ComponentFixture<SampleGatherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SampleGatherComponent]
    });
    fixture = TestBed.createComponent(SampleGatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
