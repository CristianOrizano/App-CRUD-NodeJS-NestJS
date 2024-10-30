import { AutoMap } from '@automapper/classes';

export class CategoriaSimpleDto {
	@AutoMap()
	id: number;
	@AutoMap()
	nombre: string;
}
