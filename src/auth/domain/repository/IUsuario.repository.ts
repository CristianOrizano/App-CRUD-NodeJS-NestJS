import { Usuario } from '../usuario.entity';

export interface IUsuarioRepository {
	findAllAsycn(): Promise<Usuario[]>;
	findByIdAsycn(id: number): Promise<Usuario>;
	saveAsycn(usuario: Usuario): Promise<Usuario>;
	deleteAsycn(id: number): Promise<void>;
}
