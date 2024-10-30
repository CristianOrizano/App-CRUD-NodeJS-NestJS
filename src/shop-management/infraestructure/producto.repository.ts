import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from '../domain/producto.entity';
import { IProductoRepository } from '../domain/repository/IProducto.repository';
import { Repository } from 'typeorm';
import { PageResponse } from '../shared/page/pageResponse';

@Injectable()
export class ProductoRepository implements IProductoRepository {
	constructor(
		@InjectRepository(Producto)
		private productoRepository: Repository<Producto>,
	) {}
	async findAllAsycn(): Promise<Producto[]> {
		const aa = await this.productoRepository.find({ relations: { categoria: true } });
		return await this.productoRepository.find({ relations: { categoria: true } });
	}
	async findByIdAsycn(id: number): Promise<Producto> {
		return await this.productoRepository.findOne({ where: { id } });
	}

	async deleteAsycn(id: number): Promise<void> {
		await this.productoRepository.delete(id);
	}
	paginated(producto: Producto, page: number, rows: number): Promise<PageResponse<Producto>> {
		throw new Error('Method not implemented.');
	}

	async saveAsycn(producto: Producto): Promise<Producto> {
		return await this.productoRepository.save(producto);
	}
}
