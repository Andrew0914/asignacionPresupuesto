import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {

  @Input() empleado: any;
  @Input() semilla: boolean;

  constructor() { }

  ngOnInit() {
  }

  agregarAmiNivel(){

  }
  quitar(){}
  agregarInferior(){}

}
