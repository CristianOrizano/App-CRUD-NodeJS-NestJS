import { AutoMap } from '@automapper/classes';

export class RoleDto {
	@AutoMap()
	id: number;
	@AutoMap()
	nombre: string;
}
