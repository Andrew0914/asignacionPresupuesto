import { TestBed } from "@angular/core/testing";

import { AsignacionService } from "./asignacion.service";
import { Manager } from "../model/manager.model";
import { TipoEmpleado } from "../model/tipo-empleado.model";
import { Empleado } from "../model/empleado.model";

describe("Probando creacion de jerarquia", () => {

	let service: AsignacionService;
	let tipoManger: TipoEmpleado;
	let tipoDeveloper: TipoEmpleado;
	let tipoQA: TipoEmpleado;
	let developer:Empleado;
	let QA:Empleado;
	let manager:Manager;


	// Inicializa el departamento
	const setupDepartamentoInicial = () => {
		const semillaInicial: Manager = {
			id: service.getIncrementalID(),
			nombre: "Manager",
			tipo: tipoManger,
			nodos: []
		};
		service.crearJerarquinaInicial(semillaInicial);
		return semillaInicial;
	};

	beforeEach(() => {
		// hacemos una instancia nueva para probar individualmente los comportamientos
		service = new AsignacionService();
		service.incrementalID = 0;
		tipoManger = service.getTipoEmpleado("Manager");
		tipoDeveloper = service.getTipoEmpleado("Developer");
		tipoQA = service.getTipoEmpleado("QA");

		manager = {
			nombre:'Manager',
			tipo:tipoManger,
			nodos:[]
		};

		developer = {
			nombre:'Developer test',
			tipo:tipoDeveloper
		};

		QA = {
			nombre:'QA test',
			tipo:tipoQA
		};
	});

	it("Obtener el tipo de empleado correcto: Manager", () => {
		//given
		const tipoBuscado = "Manager";
		const objetoTipoEsperado: TipoEmpleado = {
		tipo: "Manager",
		asignacion: 300
		};
		//when: obtenemos el tipo
		const tipoObtenido: TipoEmpleado = service.getTipoEmpleado(tipoBuscado);

		//then
		expect(tipoObtenido).toEqual(objetoTipoEsperado);
	});

	it("Se crea  departamento inical con primer empleado manager", () => {
		//given
		const semilla = setupDepartamentoInicial();
		const departamentoEsperado = { manager: semilla };

		// given
		service.crearJerarquinaInicial(semilla);
		const departamentoCreado = service.getDepartamento();

		// when
		expect(departamentoEsperado).toEqual(departamentoCreado);
	});

	it('Obtener ID incrementado +1 para el nodo agregado respecto del ultimo ID creado',()=>{
		//given: incia departamento con ID 1
		setupDepartamentoInicial();
		const idEsperado = 3;
		// when: agregamos dos empleados
		service.agregarEmpleado( service.getDepartamento().manager , developer); //2
		service.agregarEmpleado( service.getDepartamento().manager , QA); // should be 3
		const ultimoID = service.getCurrentID();
		// then
		expect( ultimoID ).toBe( idEsperado );
	});

	it('No agregar empleados a no-managers',()=>{
		//given
		setupDepartamentoInicial();
		service.agregarEmpleado(service.getDepartamento().manager , developer);
		//when : nodos = empleados
		const fueAgregado = service.agregarEmpleado(service.getDepartamento().manager.nodos[0], QA);
		//then
		expect(fueAgregado).toBeFalsy();
	});

	it('Obtener presupuesto disponible para managers solamente', () =>{
		//given
		setupDepartamentoInicial();
		service.agregarEmpleado( service.getDepartamento().manager , developer); //unshift: 1
		service.agregarEmpleado( service.getDepartamento().manager , QA); // unshift: 0
		const sinPresupuesto = 0;
		// when
		const {presupuesto} = service.calcularPresupuesto(service.getDepartamento().manager.nodos[1]);
		//then: no es manager, presupuesto = 0
		expect(presupuesto).toEqual(sinPresupuesto);
	});

	it('Eliminar cualquier tipo de empleado con el ID dado', () => {
		//given
		setupDepartamentoInicial();// id 1
		service.agregarEmpleado( service.getDepartamento().manager , developer); // id 2
		const departamento = service.getDepartamento();
		manager.id = 1;
		const departamentoEsperado = {manager};
		//when
		service.eliminar(2);
		//then
		expect( departamento ).toEqual( departamentoEsperado );
	});

	it('Total de presupuesto correcto segun la estructura del departamento: 2800', () =>{
		//given
		setupDepartamentoInicial(); // 300
		service.agregarEmpleado( service.getDepartamento().manager , developer); // 1000
		service.agregarEmpleado( service.getDepartamento().manager , QA); // 500 
		service.agregarEmpleado( service.getDepartamento().manager , manager); // 300 
		service.agregarEmpleado( service.getDepartamento().manager.nodos[0] , developer); // 1000
		const presupuestoEsperado = 3100;
		// when
		const {presupuesto} = service.calcularPresupuesto( service.getDepartamento().manager );
		// then
		expect(presupuesto).toEqual(presupuestoEsperado);
	});
});
