import { Injectable, NotFoundException } from '@nestjs/common';
import { ICategoriaService } from './repository/ICategoria.service';
import { CategoriaRepository } from '../infraestructure/categoria.repository';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { CategoriaDto } from './dtos/Categoria/categoria.dto';
import { CategoriaFilter } from './dtos/Categoria/categoria.filter.dto';
import { CategoriaSaveDto } from './dtos/Categoria/categoria.save.dto';
import { Categoria } from '../domain/categoria.entity';
import { PageResponse } from '../shared/page/pageResponse';

@Injectable()
export class CategoriaService implements ICategoriaService {
	constructor(
		private readonly categoriaRepository: CategoriaRepository,
		@InjectMapper()
		private readonly mapper: Mapper, // Inyectar el mapper
	) {}

	async findAllAsycn(): Promise<CategoriaDto[]> {
		const categorias = await this.categoriaRepository.findAllAsycn();
		return this.mapper.mapArrayAsync(categorias, Categoria, CategoriaDto);
	}

	async findByIdAsycn(id: number): Promise<CategoriaDto> {
		const categoria = await this.categoriaRepository.findByIdAsycn(id);
		if (!categoria) {
			throw new NotFoundException(`categoria con ID ${id} no encontrado.`);
		}
		return this.mapper.mapAsync(categoria, Categoria, CategoriaDto);
	}

	async createAsycn(savedto: CategoriaSaveDto): Promise<CategoriaDto> {
		const categoria = this.mapper.map(savedto, CategoriaSaveDto, Categoria);
		categoria.estado = true;
		const categoriaSave = await this.categoriaRepository.saveAsycn(categoria);
		return this.mapper.mapAsync(categoriaSave, Categoria, CategoriaDto);
	}

	async updateAsycn(id: number, savedto: CategoriaSaveDto): Promise<CategoriaDto> {
		const categoria = await this.categoriaRepository.findByIdAsycn(id);

		if (!categoria) {
			throw new NotFoundException(`categoria con ID ${id} no encontrado.`);
		}

		this.mapper.mutateAsync(savedto, categoria, CategoriaSaveDto, Categoria);
		const categoriaUpdate = await this.categoriaRepository.saveAsycn(categoria);
		return this.mapper.mapAsync(categoriaUpdate, Categoria, CategoriaDto);
	}

	async deleteAsycn(id: number): Promise<CategoriaDto> {
		const categoria = await this.categoriaRepository.findByIdAsycn(id);
		categoria.estado = false;
		if (!categoria) {
			throw new NotFoundException(`categoria con ID ${id} no encontrado.`);
		}

		const categoriaUpdate = await this.categoriaRepository.saveAsycn(categoria);
		return this.mapper.mapAsync(categoriaUpdate, Categoria, CategoriaDto);
	}

	async paginated(filters: CategoriaFilter): Promise<PageResponse<CategoriaDto>> {
		const categoria = new Categoria();
		categoria.nombre = filters.nombre;
		categoria.descripcion = filters.descripcion;
		// Solo asignar 'estado' si está definido.
		if (filters.estado !== undefined) {
			categoria.estado = filters.estado;
		}

		const categorias = await this.categoriaRepository.paginated(categoria, filters.page, filters.rows);
		const mappedData = await this.mapper.mapArrayAsync(categorias.data, Categoria, CategoriaDto);
		return {
			data: mappedData,
			page: categorias.page,
			rows: categorias.rows,
			total: categorias.total,
		} as PageResponse<CategoriaDto>;
	}
}
