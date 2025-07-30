import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EligibleWarehousesComponent } from './eligible-warehouses.component';

describe('EligibleWarehousesComponent', () => {
  let component: EligibleWarehousesComponent;
  let fixture: ComponentFixture<EligibleWarehousesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EligibleWarehousesComponent]
    });
    fixture = TestBed.createComponent(EligibleWarehousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
