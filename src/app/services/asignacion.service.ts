import { Injectable } from '@angular/core';
import { TipoEmpleado } from '../model/tipo-empleado.model';
import { Manager } from '../model/empleado.model';

@Injectable({
  providedIn: 'root'
})
export class AsignacionService {

  private tipos: TipoEmpleado[] = [
    {
      tipo: 'Manager',
      asignacion: 300
    },
    {
      tipo: 'QA',
      asignacion: 500
    },
    {
      tipo: 'Developer',
      asignacion: 1000
    }
  ];

  private departamento: any;

  constructor() { }

  /**
   * Devuelve los tipos disponibles de empleados
   */
  getTiposEmpleado(): TipoEmpleado[] {
    return this.tipos;
  }

  /**
   * Devuelve un objeto de  tipo de empleado
   * @param tipo string
   */
  getTipoEmpleado( tipo: string ): TipoEmpleado{
    for ( const tipoEmpleado of this.tipos){
      if ( tipoEmpleado.tipo === tipo ) {
        return tipoEmpleado;
      }
    }
  }

  /**
   * Devulve el departamento o jerarquia de departamento existente
   */
  getDepartamento() {
    return this.departamento;
  }

  /**
   * Establece la semilla o carga inicial de la jerarquia
   * @param manager Manager
   */
  crearJerarquinaInicial( manager: Manager) {
    this.departamento = { manager };
  }

}
