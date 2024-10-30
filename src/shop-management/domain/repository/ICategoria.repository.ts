import { PageResponse } from 'src/shop-management/shared/page/pageResponse';
import { Categoria } from '../categoria.entity';

export interface ICategoriaRepository {
	findAllAsycn(): Promise<Categoria[]>;
	findByIdAsycn(id: number): Promise<Categoria>;
	saveAsycn(categoria: Categoria): Promise<Categoria>;
	deleteAsycn(id: number): Promise<void>;
	paginated(categoria: Categoria, page: number, rows: number): Promise<PageResponse<Categoria>>;
}
