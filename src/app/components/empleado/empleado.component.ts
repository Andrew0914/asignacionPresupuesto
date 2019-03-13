import { Component, OnInit, Input } from '@angular/core';
import { AsignacionService } from 'src/app/services/asignacion.service';
import { Manager } from '../../model/manager.model';
import { Empleado } from '../../model/empleado.model';
import { MatDialog } from '@angular/material/dialog';
import { AgregarEmpleadoComponent } from '../agregar-empleado/agregar-empleado.component';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {

  @Input() empleado: any;
  @Input() semilla: boolean;

  constructor(public asigService: AsignacionService, private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  agregarAmiNivel() {}

  quitar() {}

  agregarInferior() {
    // si tiene nodos / es manager
    if ( this.empleado.nodos ) {
      const dialogRef = this.dialog.open(AgregarEmpleadoComponent, { width: '300px',  data: this.empleado, disableClose: true});
      dialogRef.afterClosed().subscribe( empleado => {
        if ( empleado ) {
          this.empleado.nodos.unshift(empleado);
        }
      });
    }
  }

}
