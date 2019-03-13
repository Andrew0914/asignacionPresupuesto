import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEmpleadoComponent } from './agregar-empleado.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { AsignacionService } from 'src/app/services/asignacion.service';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

xdescribe('AgregarEmpleadoComponent', () => {
  let component: AgregarEmpleadoComponent;
  let fixture: ComponentFixture<AgregarEmpleadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarEmpleadoComponent ],
      imports: [FormsModule,
        MatButtonModule,
        MatSelectModule,
        MatInputModule,
        MatSnackBarModule,
        MatDialogModule],
      providers: [
          AsignacionService,
          {provide: MAT_DIALOG_DEFAULT_OPTIONS},
          MatDialogRef,
          MAT_DIALOG_DATA,
          MatSnackBar,
      ]
    });
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [AgregarEmpleadoComponent]
      }
    });
    fixture = TestBed.createComponent(AgregarEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crearse el componente para agregar empleado', () => {
    expect(component).toBeTruthy();
  });
});
