import { AutoMap } from '@automapper/classes';
import { UsuarioDto } from './usuario.dto';

export class UsuarioSecurityDto {
	@AutoMap()
	token: string;
	@AutoMap()
	expiresAt: string;
	@AutoMap()
	usuario: UsuarioDto;
}
