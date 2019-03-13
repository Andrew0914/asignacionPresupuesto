import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirma-quitar',
  templateUrl: './confirma-quitar.component.html',
  styles: []
})
export class ConfirmaQuitarComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<ConfirmaQuitarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  /**
   * Regresa la confirmacion para remover el nodo
   */
  quitar() {
    this.dialogRef.close( this.data.id );
  }

  /**
   * Cancela la remocion del nodo
   */
  cancelar() {
    this.dialogRef.close( null );
  }

}
