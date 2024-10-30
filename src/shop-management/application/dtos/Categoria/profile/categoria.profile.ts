import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { CategoriaDto } from '../categoria.dto';
import { Categoria } from 'src/shop-management/domain/categoria.entity';
import { CategoriaSaveDto } from '../categoria.save.dto';
import { CategoriaSimpleDto } from '../categoria.simple.dto';

@Injectable()
export class CategoriaProfile extends AutomapperProfile {
	constructor(@InjectMapper() mapper: Mapper) {
		super(mapper);
	}
	get profile(): MappingProfile {
		return mapper => {
			createMap(mapper, CategoriaDto, Categoria);
			createMap(mapper, Categoria, CategoriaDto);
			createMap(mapper, Categoria, CategoriaSimpleDto);

			createMap(mapper, CategoriaSaveDto, Categoria);
		};
	}
}
