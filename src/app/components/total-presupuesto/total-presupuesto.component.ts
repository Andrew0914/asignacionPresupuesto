import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AsignacionService } from 'src/app/services/asignacion.service';

@Component({
  selector: 'app-total-presupuesto',
  templateUrl: './total-presupuesto.component.html',
  styles: []
})
export class TotalPresupuestoComponent implements OnInit {

  presupuesto: any;

  constructor( public dialogRef: MatDialogRef<TotalPresupuestoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private asigService: AsignacionService) {
      this.presupuesto = this.asigService.calcularPresupuesto( data );
    }

  ngOnInit() {
  }

  /**
   * Cierra el cuadro de dialogo
   */
  cerrar() {
    this.dialogRef.close();
  }

}
