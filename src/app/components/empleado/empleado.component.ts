import { Component, OnInit, Input } from '@angular/core';
import { AsignacionService } from 'src/app/services/asignacion.service';
import { MatDialog } from '@angular/material/dialog';
import { AgregarEmpleadoComponent } from '../agregar-empleado/agregar-empleado.component';
import { ConfirmaQuitarComponent } from '../confirma-quitar/confirma-quitar.component';
import { TotalPresupuestoComponent } from '../total-presupuesto/total-presupuesto.component';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styles: []
})
export class EmpleadoComponent implements OnInit {

  @Input() empleado: any;
  @Input() semilla: boolean;
  @Input() noAcciones = false;

  constructor(public asigService: AsignacionService, private dialog: MatDialog) {
  }

  ngOnInit() {
  }


  /**
   * Abre el dialogo para confirma la remocion de un elemento basado en su id
   */
  quitar() {
    const dialogRef = this.dialog.open(ConfirmaQuitarComponent, { width: '300px',  data: this.empleado, disableClose: true});
    dialogRef.afterClosed().subscribe( empleadoId => {
      if ( empleadoId ) {
        this.asigService.eliminar( empleadoId );
        this.asigService.guardarCambios();
        this.asigService.setTotalDepartamento();
      }
    });
  }

  /**
   * Agrega empleados inferiores en loa jerarquia
   */
  agregarInferior() {
    // si tiene nodos / es manager
    if ( this.empleado.nodos ) {
      const dialogRef = this.dialog.open(AgregarEmpleadoComponent, { width: '300px',  data: this.empleado, disableClose: true});
      dialogRef.afterClosed().subscribe( empleadoNuevo => {
        if ( empleadoNuevo ) {
          this.asigService.agregarEmpleado( this.empleado , empleadoNuevo);
          this.asigService.guardarCambios();
          this.asigService.setTotalDepartamento();
        }
      });
    }
  }

  /**
   * Genera el arbol y consulta el presupeusto para un empleado dado
   */
  calculaPresupuesto( empleado: any) {
    const dialogRef = this.dialog.open(TotalPresupuestoComponent, { width: '600px',  data: this.empleado});
  }

}
