import { PageResponse } from 'src/shop-management/shared/page/pageResponse';
import { CategoriaDto } from '../dtos/Categoria/categoria.dto';
import { CategoriaFilter } from '../dtos/Categoria/categoria.filter.dto';
import { CategoriaSaveDto } from '../dtos/Categoria/categoria.save.dto';

export interface ICategoriaService {
	findAllAsycn(): Promise<CategoriaDto[]>;
	findByIdAsycn(id: number): Promise<CategoriaDto>;
	createAsycn(savedto: CategoriaSaveDto): Promise<CategoriaDto>;
	updateAsycn(id: number, savedto: CategoriaSaveDto): Promise<CategoriaDto>;
	deleteAsycn(id: number): Promise<CategoriaDto>;
	paginated(filters: CategoriaFilter): Promise<PageResponse<CategoriaDto>>;
}
