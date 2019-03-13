import { Component, OnInit } from '@angular/core';
import { AsignacionService } from 'src/app/services/asignacion.service';
import { Manager } from 'src/app/model/manager.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  tipoElegido: string;
  nombre: string;


  constructor(public asigServ: AsignacionService, private snackBar: MatSnackBar) {
     this.asigServ.setTotalDepartamento();
  }

  ngOnInit() {
  }

  /**
   * Manda los valores para crear la jerarquia inicial
   */
  crearDepartamento() {
    if ( this.nombre && this.tipoElegido ){
      const manager: Manager = {
        id: this.asigServ.getIncrementalID(),
        nombre: this.nombre,
        tipo: this.asigServ.getTipoEmpleado(this.tipoElegido),
        nodos: []
      };
      this.asigServ.crearJerarquinaInicial( manager );
      this.asigServ.setTotalDepartamento();
    } else {
      this.snackBar.open('Coloca el nombre y tipo de empleado', '', {duration: 3000});
    }
  }

}
