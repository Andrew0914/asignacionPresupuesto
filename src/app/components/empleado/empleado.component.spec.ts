import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoComponent } from './empleado.component';

xdescribe('EmpleadoComponent', () => {
  let component: EmpleadoComponent;
  let fixture: ComponentFixture<EmpleadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpleadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
