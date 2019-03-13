import { TestBed } from '@angular/core/testing';

import { AsignacionService } from './asignacion.service';
import { Manager } from '../model/manager.model';
import { TipoEmpleado } from '../model/tipo-empleado.model';
import { Empleado } from '../model/empleado.model';
import { currentId } from 'async_hooks';

describe('AsignacionService', () => {

  let service: AsignacionService;

  beforeEach(() => TestBed.configureTestingModule({}));
  /** Creamos el servicio para ve rle cambio de jerarquia */
  beforeAll( () => {
    service = TestBed.get(AsignacionService);
  });

  // #prueba0
  it('Crear el servicio', () => {
    expect(service).toBeTruthy();
  });

  // #prueba1
  it('Agrega el manager semilla al departamento', () => {
    const manager: Manager = {
      id: service.getIncrementalID(),
      nombre: 'Andrew',
      tipo: {
        tipo: 'Manager',
        asignacion: 300
      },
      nodos: []
    };

    service.crearJerarquinaInicial(manager);

    const departamento = service.getDepartamento();

    expect(departamento.manager).toEqual(manager);

  });

  // #prueba2
  it('Devuelve le objeto de tipo de empleado elegido: Developer' , () => {
    const tipo: TipoEmpleado = {
      tipo: 'Developer',
      asignacion: 1000
    };
    const tipoElegido = service.getTipoEmpleado('Developer');
    expect( tipoElegido ).toEqual( tipo );
  });

  // #prueba3
  it('Almacenó cambios de departamento en local storage', () => {
    // cundo guarda la semilla ya debe guardar en el local stora #prueba1
    expect( (localStorage.getItem('departamento') !== undefined )).toBe(true);
  });

  // #prueba4
  it('Nuevo nodo, debe tener un ID incrementando y distinto', () => {
    const currentID = service.getCurrentID();
    const developer: Empleado = {
      id: service.getIncrementalID(),
      nombre: 'Andrew',
      tipo: {
        tipo: 'Developer',
        asignacion: 1000
      }
    };
    service.getDepartamento().manager.nodos.unshift( developer );

    expect(service.getDepartamento().manager.nodos[0]).toEqual(
      {
        id: (currentID + 1) ,
        nombre: 'Andrew',
        tipo: {
          tipo: 'Developer',
          asignacion: 1000
        }
    });

  });


  // #prueba5
  it('Eliminar un nodo basado en su ID', () => {
    // tomamos el estado actual del departamento y lo guardamos
    service.guardarCambios();
    // elimina el developer de la prueba 4
    service.eliminar( service.getCurrentID());
    expect(service.getDepartamento().manager.nodos.length).toBe(0);
  });

  // prueba6
  it('Calcula presupeusto actual: 300, despues de acciones', () => {
    const total = service.calcularPresupuesto(service.getDepartamento().manager);
    expect( total.presupuesto ).toBe(300);
  });
});
