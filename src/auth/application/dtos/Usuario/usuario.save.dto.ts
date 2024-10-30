import { AutoMap } from '@automapper/classes';
import { IsNumber, IsString } from 'class-validator';

export class UsuariosaveDto {
	@IsString()
	@AutoMap()
	nombre: string;
	@IsString()
	@AutoMap()
	apellido: string;
	@IsString()
	@AutoMap()
	email: string;
	@IsString()
	@AutoMap()
	password: string;
	@IsNumber()
	@AutoMap()
	idRole: number;
}
