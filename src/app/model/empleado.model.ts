import { TipoEmpleado } from './tipo-empleado.model';

export interface Empleado {
    id: number;
    nombre: string;
    tipo: TipoEmpleado;
}
