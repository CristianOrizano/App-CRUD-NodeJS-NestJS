import { PageResponse } from 'src/shop-management/shared/page/pageResponse';
import { Producto } from '../producto.entity';

export interface IProductoRepository {
	findAllAsycn(): Promise<Producto[]>;
	findByIdAsycn(id: number): Promise<Producto>;
	saveAsycn(producto: Producto): Promise<Producto>;
	deleteAsycn(id: number): Promise<void>;
	paginated(producto: Producto, page: number, rows: number): Promise<PageResponse<Producto>>;
}
