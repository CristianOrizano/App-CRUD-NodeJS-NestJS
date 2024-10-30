import { AutoMap } from '@automapper/classes';
import { CategoriaSaveDto } from '../Categoria/categoria.save.dto';
import { IsBoolean, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ProductoCategoriaSaveDto {
	@AutoMap()
	@IsString()
	nombre: string;
	@AutoMap()
	@IsString()
	descripcion: string;
	@AutoMap()
	@IsNumber()
	stock: number;
	@AutoMap()
	@IsNumber()
	precio: number;
	@AutoMap()
	@ValidateNested()
	@Type(() => CategoriaSaveDto)
	categoria: CategoriaSaveDto;
}
