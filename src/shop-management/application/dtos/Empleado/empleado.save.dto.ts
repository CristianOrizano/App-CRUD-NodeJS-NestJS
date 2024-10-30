import { AutoMap } from '@automapper/classes';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class EmpleadoSaveDto {
  @AutoMap()
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  nombre: string;

  @AutoMap()
  @IsString({ message: 'El apellido debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El apellido es obligatorio.' })
  apellido: string;

  @AutoMap()
  @IsNumber({}, { message: 'El sueldo debe ser un número.' })
  @IsNotEmpty({ message: 'El sueldo es obligatorio.' })
  sueldo: number;

  @AutoMap()
 // @IsDate({ message: 'La fecha debe ser una fecha válida.' })
  @IsNotEmpty({ message: 'La fecha de nacimiento es obligatoria.' })
  fechaNacimiento: Date;

  @AutoMap()
  @IsNumber({}, { message: 'El teléfono debe ser un número.' })
  @IsNotEmpty({ message: 'El teléfono es obligatorio.' })
  telefono: number;
}
