import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICategoriaRepository } from '../domain/repository/ICategoria.repository';
import { Categoria } from '../domain/categoria.entity';
import { Repository } from 'typeorm';
import { PageResponse } from '../shared/page/pageResponse';

@Injectable()
export class CategoriaRepository implements ICategoriaRepository {
	constructor(
		@InjectRepository(Categoria)
		private categoriaRepository: Repository<Categoria>,
	) {}

	async findAllAsycn(): Promise<Categoria[]> {
		return await this.categoriaRepository.find();
	}
	async findByIdAsycn(id: number): Promise<Categoria> {
		return await this.categoriaRepository.findOne({ where: { id } });
	}
	async saveAsycn(categoria: Categoria): Promise<Categoria> {
		return await this.categoriaRepository.save(categoria);
	}

	async deleteAsycn(id: number): Promise<void> {
		await this.categoriaRepository.delete(id);
	}

	async paginated(categoria: Categoria, page: number, rows: number): Promise<PageResponse<Categoria>> {
		const total = await this.categoriaRepository.createQueryBuilder('categoria').getCount();
		const queryBuilder = this.categoriaRepository.createQueryBuilder('categoria');

		if (categoria?.nombre) {
			queryBuilder.andWhere('categoria.nombre LIKE :nombre', { nombre: `%${categoria.nombre}%` });
		}
		if (categoria?.descripcion) {
			queryBuilder.andWhere('categoria.descripcion LIKE :descripcion', {
				descripcion: `%${categoria.descripcion}%`,
			});
		}
		if (categoria?.estado !== undefined) {
			console.log('filtro estado', categoria);
			// Filtrar por estado si está definido
			queryBuilder.andWhere('categoria.estado = :estado', { estado: categoria.estado });
		}

		const [result, filteredTotal] = await queryBuilder
			.skip((page - 1) * rows)
			.take(rows)
			.getManyAndCount();

		return {
			data: result,
			page: page,
			rows: result.length,
			total: total,
		};
	}
}
