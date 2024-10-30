import { PageRequest } from 'src/shop-management/shared/page/pageRequest';

export class CategoriaFilter extends PageRequest {
	nombre: string;
	descripcion: string;
	estado: boolean;
}
