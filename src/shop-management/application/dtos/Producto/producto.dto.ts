import { AutoMap } from '@automapper/classes';
import { CategoriaSimpleDto } from '../Categoria/categoria.simple.dto';

export class ProductoDto {
	@AutoMap()
	id: number;
	@AutoMap()
	nombre: string;
	@AutoMap()
	descripcion: string;
	@AutoMap()
	stock: number;
	@AutoMap()
	precio: number;
	@AutoMap()
	categoria: CategoriaSimpleDto;
	@AutoMap()
	idCategoria: number;
	@AutoMap()
	estado: boolean;
}
