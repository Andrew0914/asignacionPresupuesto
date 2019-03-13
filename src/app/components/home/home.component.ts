import { Component, OnInit } from '@angular/core';
import { AsignacionService } from 'src/app/services/asignacion.service';
import { Manager } from 'src/app/model/manager.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tipoElegido: string;
  nombre: string;
  departamento: any;

  constructor(public asigServ: AsignacionService, private snackBar: MatSnackBar) {}

  ngOnInit() {
  }

  /**
   * Manda los valores para crear la jerarquia inicial
   */
  crearDepartamento() {
    if ( this.nombre && this.tipoElegido ){
      const manager: Manager = {
        nombre: this.nombre,
        tipo: this.asigServ.getTipoEmpleado(this.tipoElegido),
        nodos: []
      };
      this.asigServ.crearJerarquinaInicial( manager );
      this.departamento = this.asigServ.getDepartamento();
      console.log(this.asigServ.getDepartamento());
    } else {
      this.snackBar.open('Coloca el nombre y tipo de empleado', '', {duration: 3000});
    }
  }

}
