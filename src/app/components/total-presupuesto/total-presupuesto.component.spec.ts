import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalPresupuestoComponent } from './total-presupuesto.component';

describe('TotalPresupuestoComponent', () => {
  let component: TotalPresupuestoComponent;
  let fixture: ComponentFixture<TotalPresupuestoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalPresupuestoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalPresupuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
