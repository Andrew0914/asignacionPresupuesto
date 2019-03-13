import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AsignacionService } from 'src/app/services/asignacion.service';

@Component({
  selector: 'app-agregar-empleado',
  templateUrl: './agregar-empleado.component.html',
  styleUrls: ['./agregar-empleado.component.css']
})
export class AgregarEmpleadoComponent implements OnInit {

  tipoElegido: string;
  nombre: string;
  empleado: any;

  constructor(public dialogRef: MatDialogRef<AgregarEmpleadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public asigServ: AsignacionService) {
      this.empleado = data;
    }

  ngOnInit() {
  }

  guardar() {
    let empleado = null;
    if (this.tipoElegido === 'Manager') {
      empleado = { nombre: this.nombre, tipo: this.asigServ.getTipoEmpleado(this.tipoElegido) , nodos: [] };
    } else {
      empleado = { nombre: this.nombre, tipo: this.asigServ.getTipoEmpleado(this.tipoElegido)  };
    }
    this.dialogRef.close( empleado );
  }

  cancelar(){
    this.dialogRef.close( null );
  }

}
