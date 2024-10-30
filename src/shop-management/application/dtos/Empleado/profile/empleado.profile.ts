import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Empleado } from 'src/shop-management/domain/empleado.entity';
import { EmpleadoDto } from '../empleado.dto';
import { Injectable } from '@nestjs/common';
import { createMap, forMember, mapFrom, Mapper, MappingProfile } from '@automapper/core';
import { EmpleadoSaveDto } from '../empleado.save.dto';
import { PageResponse } from 'src/shop-management/shared/page/pageResponse';

@Injectable()
export class EmpleadoProfile extends AutomapperProfile {
	constructor(@InjectMapper() mapper: Mapper) {
		super(mapper);
	}
	get profile(): MappingProfile {
		return mapper => {
			createMap(mapper, EmpleadoDto, Empleado);

			createMap(mapper, PageResponse<Empleado>, PageResponse<EmpleadoDto>);

			createMap(mapper, EmpleadoSaveDto, Empleado);
			createMap(
				mapper,
				Empleado,
				EmpleadoDto,
				forMember(
					dest => dest.telefonoContacto,
					mapFrom(src => src.telefono),
				),
			);
		};
	}
}
