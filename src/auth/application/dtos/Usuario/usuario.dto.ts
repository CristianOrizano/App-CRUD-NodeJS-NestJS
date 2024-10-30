import { AutoMap } from '@automapper/classes';

export class UsuarioDto {
	@AutoMap()
	id: number;
	@AutoMap()
	nombre: string;
	@AutoMap()
	apellido: string;
	@AutoMap()
	email: string;
	@AutoMap()
	password: string;
	@AutoMap()
	idRole: number;
	@AutoMap()
	estado: boolean;
}
