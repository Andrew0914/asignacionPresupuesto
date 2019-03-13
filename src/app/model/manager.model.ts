import { TipoEmpleado } from './tipo-empleado.model';

export interface Manager{
    nombre: string;
    tipo: TipoEmpleado;
    nodos: any[];
}
