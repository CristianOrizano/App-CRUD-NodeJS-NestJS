import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class EmpleadoDto {
  @AutoMap()
  id: number;

  @AutoMap()
  nombre: string;

  @AutoMap()
  apellido: string;

  @AutoMap()
  sueldo: number;

  @AutoMap()
  fechaNacimiento?: Date;

  @AutoMap()
  telefonoContacto: number;
}
