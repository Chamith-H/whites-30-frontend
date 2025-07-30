import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeighBridgeComponent } from './weigh-bridge.component';

describe('WeighBridgeComponent', () => {
  let component: WeighBridgeComponent;
  let fixture: ComponentFixture<WeighBridgeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeighBridgeComponent]
    });
    fixture = TestBed.createComponent(WeighBridgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
