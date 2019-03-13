import { Injectable } from '@angular/core';
import { TipoEmpleado } from '../model/tipo-empleado.model';
import { Empleado } from '../model/empleado.model';
import { Manager } from '../model/manager.model';

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

  private incrementalID = 0;

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

  /**
   * Almacena los cambios en el locla storage
   */
  guardarCambios() {
    console.log(this.departamento);
  }

  /**
   * Devuelve el id incrementando en uno
   */
  getIncrementalID() {
    this.incrementalID += 1;
    return this.incrementalID;
  }

  eliminar( id: any ) {
    if ( this.departamento.manager.id === id ) {
      this.departamento.manager = undefined;
    } else {
      this.iteracion( this.departamento.manager,id);
    }

    this.guardarCambios();
  }


  iteracion(nodo: any, id: number) {
    for (let i = 0; i < nodo.nodos.length ; i++) {
      if ( nodo.nodos[i].id === id ) {
        nodo.nodos.splice(i , 1);
        break;
      }
      if (nodo.nodos[i].nodos ) {
        this.iteracion(nodo.nodos[i] , id);
      }
    }
  }

}
