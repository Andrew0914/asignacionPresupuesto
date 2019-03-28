import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AsignacionService } from 'src/app/services/asignacion.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-agregar-empleado',
  templateUrl: './agregar-empleado.component.html',
  styles: []
})
export class AgregarEmpleadoComponent implements OnInit {

  tipoElegido: string;
  nombre: string;
  empleado: any;

  constructor(public dialogRef: MatDialogRef<AgregarEmpleadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public asigServ: AsignacionService,
    private snackBar: MatSnackBar) {
      this.empleado = data;
    }

  ngOnInit() {
  }
  /**
   * Construye y devuelve el node del empleado generado, para que el componente de empleado lo maneje
   */
  guardar() {
    // validamos
    if (this.nombre && this.tipoElegido ) {
      let empleadoNuevo = null;
      // si es manager tendra nodos
      if (this.tipoElegido === 'Manager') {
        empleadoNuevo = { nombre: this.nombre, tipo: this.asigServ.getTipoEmpleado(this.tipoElegido) , nodos: [] };
      } else {
        empleadoNuevo = { nombre: this.nombre, tipo: this.asigServ.getTipoEmpleado(this.tipoElegido)  };
      }
      this.dialogRef.close( empleadoNuevo );
    } else {
      this.snackBar.open('Coloca el nombre y tipo de empleado', '', {duration: 3000});
    }

  }
  /**
   * Cancelamos el dialogo sin data de vuelta
   */
  cancelar() {
    this.dialogRef.close( null );
  }

}
