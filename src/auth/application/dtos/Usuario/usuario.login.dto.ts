import { AutoMap } from '@automapper/classes';
import { IsString } from 'class-validator';

export class UsuarioLoginDto {
	@IsString()
	@AutoMap()
	email: string;
	@IsString()
	@AutoMap()
	password: string;
}
