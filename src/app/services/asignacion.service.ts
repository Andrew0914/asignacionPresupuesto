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
  private presupuestoTotal = 0;
  public totalDepartamento = 0;

  constructor() {
    this.cargarLocalStorage();
  }

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
  getTipoEmpleado( tipo: string ): TipoEmpleado {
    for ( const tipoEmpleado of this.tipos) {
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
   * Devuelve el id incrementando en uno
   */
  getIncrementalID() {
    this.incrementalID += 1;
    // alamacenamos el ultimo id incremental
    localStorage.setItem('incrementalID', this.incrementalID.toString());
    return this.incrementalID;
  }

  /**
   * Devuelve valor actual del ultimo ID asignado a un empleado
   */
  getCurrentID() {
    return this.incrementalID;
  }

  /**
   * Establece la semilla o carga inicial de la jerarquia
   * @param manager Manager
   */
  crearJerarquinaInicial( manager: Manager) {
    this.departamento = { manager };
  }

  agregarEmpleado( empleadoSuperior: any,empleadoNuevo: any){
    empleadoNuevo.id = this.getIncrementalID();
    empleadoSuperior.nodos.unshift(empleadoNuevo);
  }
  /**
   * Recibe el id del elemento a borrar compara si es la semilla o inicia una iteracion de borrado
   * @param id number
   */
  eliminar( id: any ) {
    if ( this.departamento.manager.id === id ) {
      this.departamento.manager = undefined;
    } else {
      this.iteracionEliminar( this.departamento.manager, id);
    }
  }

  /**
   * Itera los elementos o nodos rescursivamente, evalua que el id corresponday lo remueve de su arreglo correspondiente
   * @param nodo any
   * @param id number
   */
  iteracionEliminar(nodo: any, id: number) {
    for (let i = 0; i < nodo.nodos.length ; i++) {
      if ( nodo.nodos[i].id === id ) {
        nodo.nodos.splice(i , 1);
        break;
      }
      if (nodo.nodos[i].nodos ) {
        this.iteracionEliminar(nodo.nodos[i] , id);
      }
    }
  }

  /**
   * Calcula el presupuesto para el manager y los empleados que le reportan
   * @param empleado any
   */
  calcularPresupuesto(empleado: any) {
    let presupuesto = empleado.tipo.asignacion;
    if ( empleado.nodos ) {
      this.iteracionCalculo(empleado);
      presupuesto += this.presupuestoTotal;
    }
    this.presupuestoTotal = 0;
    return {presupuesto , empleado};
  }

  /**
   * Itera los nodos recursivamente para obtener el presupuesto
   * @param nodo any
   */
  iteracionCalculo(nodo: any) {
    for (let i = 0; i < nodo.nodos.length ; i++) {
      this.presupuestoTotal += nodo.nodos[i].tipo.asignacion;
      if (nodo.nodos[i].nodos ) {
        this.iteracionCalculo(nodo.nodos[i]);
      }
    }
  }

  /**
   * Coloca le valor total de presupuesto en la variable global del departamento
   */
  setTotalDepartamento() {
    if ( this.departamento && this.departamento.manager ) {
      this.totalDepartamento =  this.calcularPresupuesto( this.departamento.manager ).presupuesto;
    } else {
      this.totalDepartamento = 0;
    }
  }

    /**
   * Almacena los cambios en el locla storage
   */
  guardarCambios() {
    localStorage.setItem('departamento' , JSON.stringify( this.departamento ));
  }

  /**
   * Carga la data que este en local storage
   */
  cargarLocalStorage() {
    if ( localStorage.getItem('departamento') ) {
        this.departamento = JSON.parse( localStorage.getItem('departamento') );
    } else {
        this.departamento = null;
    }

    if ( localStorage.getItem('incrementalID') ) {
        this.incrementalID =  Number.parseInt(localStorage.getItem('incrementalID'), 10);
    } else {
        this.incrementalID = 0;
    }
  }

}
