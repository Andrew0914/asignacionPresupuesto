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

	const setupDepartamentoIncial = () => {
		const semilla: Manager = {
		id: 1,
		nombre: "Manager principal",
		tipo: tipoManger,
		nodos: []
		};
		service.crearJerarquinaInicial(semilla);
		return semilla;
	};

	/** Creamos instancia del servicio de asignacion de presupuesto para usarlo en todas las pruebas */
	beforeAll(() => {
		service = TestBed.get(AsignacionService);
		tipoManger = service.getTipoEmpleado("Manager");
		tipoDeveloper = service.getTipoEmpleado("Developer");
		tipoQA = service.getTipoEmpleado("QA");
	});

	beforeEach(() => {
		// hacemos una instancia nueva para probar individualmente los comportamientos
		service = TestBed.get(AsignacionService);
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
		const semilla = setupDepartamentoIncial();
		const departamentoEsperado = { manager: semilla };

		// given
		service.crearJerarquinaInicial(semilla);
		const departamentoCreado = service.getDepartamento();

		// when
		expect(departamentoEsperado).toEqual(departamentoCreado);
	});

	it('Obtener ID incrementado +1 para el nodo agregado respecto del ultimo',()=>{
		//given: incia departamento con ID 1
		setupDepartamentoIncial();
		const idEsperado = 3;
		
	})
});
