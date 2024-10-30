import { AutoMap } from '@automapper/classes';

export class CategoriaDto {
	@AutoMap()
	id: number;
	@AutoMap()
	nombre: string;
	@AutoMap()
	descripcion: string;
	@AutoMap()
	estado: boolean;
}
