import { TipoEmpleado } from './tipo-empleado.model';

export interface Manager{
    id: number;
    nombre: string;
    tipo: TipoEmpleado;
    nodos: any[];
}
