import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { UsuarioDto } from '../usuario.dto';
import { Usuario } from 'src/auth/domain/usuario.entity';
import { UsuariosaveDto } from '../usuario.save.dto';
import { Role } from 'src/auth/domain/role.entity';
import { RoleDto } from '../../Role/role.dto';

@Injectable()
export class UsuarioProfile extends AutomapperProfile {
	constructor(@InjectMapper() mapper: Mapper) {
		super(mapper);
	}
	get profile(): MappingProfile {
		return mapper => {
			createMap(mapper, UsuarioDto, Usuario);
			createMap(mapper, Usuario, UsuarioDto);
			createMap(mapper, Role, RoleDto);
			createMap(mapper, UsuariosaveDto, Usuario);
		};
	}
}
