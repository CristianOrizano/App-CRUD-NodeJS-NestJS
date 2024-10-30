import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductoSaveDto {
	@AutoMap()
	@IsString()
	@IsNotEmpty()
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
	@IsNumber()
	idCategoria: number;
}
