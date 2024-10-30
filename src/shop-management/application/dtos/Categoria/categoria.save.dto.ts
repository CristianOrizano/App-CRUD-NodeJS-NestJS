import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, IsString } from 'class-validator';

export class CategoriaSaveDto {
	@AutoMap()
	@IsString({ message: 'El nombre debe ser una cadena de texto.' })
	@IsNotEmpty({ message: 'El nombre es obligatorio.' })
	nombre: string;

	@AutoMap()
	@IsString({ message: 'El descripcion debe ser una cadena de texto.' })
	@IsNotEmpty({ message: 'El descripcion es obligatorio.' })
	descripcion: string;
}
