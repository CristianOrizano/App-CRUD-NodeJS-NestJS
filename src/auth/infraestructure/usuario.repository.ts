import { Injectable } from '@nestjs/common';
import { IUsuarioRepository } from '../domain/repository/IUsuario.repository';
import { Usuario } from '../domain/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioRepository implements IUsuarioRepository {
	constructor(
		@InjectRepository(Usuario)
		private usuarioRepository: Repository<Usuario>,
	) {}
	async findByFieldAsync(field: Partial<Usuario>): Promise<Usuario> {
		return await this.usuarioRepository.findOne({ where: field });
	}

	async findAllAsycn(): Promise<Usuario[]> {
		return await this.usuarioRepository.find();
	}
	async findByIdAsycn(id: number): Promise<Usuario> {
		return await this.usuarioRepository.findOne({ where: { id } });
	}
	async saveAsycn(usuario: Usuario): Promise<Usuario> {
		return await this.usuarioRepository.save(usuario);
	}
	deleteAsycn(id: number): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
