import { PageRequest } from "src/shop-management/shared/page/pageRequest";

export class EmpleadoFilter extends PageRequest {
    nombre: string;
    apellido: string;
    sueldo: number;
    telefono: number;
    fecha: Date;
}