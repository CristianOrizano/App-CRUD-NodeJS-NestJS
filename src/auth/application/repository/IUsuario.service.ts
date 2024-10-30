import { UsuarioDto } from '../dtos/Usuario/usuario.dto';
import { UsuarioLoginDto } from '../dtos/Usuario/usuario.login.dto';
import { UsuariosaveDto } from '../dtos/Usuario/usuario.save.dto';
import { UsuarioSecurityDto } from '../dtos/Usuario/usuario.security.dto';

export interface IUsuarioService {
	loginAsycn(login: UsuarioLoginDto): Promise<UsuarioSecurityDto>;
	findByIdAsycn(id: number): Promise<UsuarioDto>;
	findAllAsycn(): Promise<UsuarioDto[]>;
	createAsycn(savedto: UsuariosaveDto): Promise<UsuarioDto>;
	updateAsycn(id: number, savedto: UsuariosaveDto): Promise<UsuarioDto>;
	deleteAsycn(id: number): Promise<UsuarioDto>;
	/*findAllAsycn(): Promise<CategoriaDto[]>;
	findByIdAsycn(id: number): Promise<CategoriaDto>;
	createAsycn(savedto: CategoriaSaveDto): Promise<CategoriaDto>;
	updateAsycn(id: number, savedto: CategoriaSaveDto): Promise<CategoriaDto>;
	deleteAsycn(id: number): Promise<CategoriaDto>;
	paginated(filters: CategoriaFilter): Promise<PageResponse<CategoriaDto>>; */
}
