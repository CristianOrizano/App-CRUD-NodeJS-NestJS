import { Injectable, NotFoundException } from '@nestjs/common';
import { IProductoService } from './repository/IProducto.service';
import { InjectMapper } from '@automapper/nestjs';
import { ProductoRepository } from '../infraestructure/producto.repository';
import { Mapper } from '@automapper/core';
import { ProductoDto } from './dtos/Producto/producto.dto';
import { ProductoSaveDto } from './dtos/Producto/producto.save.dto';
import { Producto } from '../domain/producto.entity';
import { Categoria } from '../domain/categoria.entity';
import { ProductoCategoriaSaveDto } from './dtos/Producto/producto.categ.dto';

@Injectable()
export class ProductoService implements IProductoService {
	constructor(
		private readonly productoRepository: ProductoRepository,
		@InjectMapper()
		private readonly mapper: Mapper, // Inyectar el mapper
	) {}

	async findAllAsycn(): Promise<ProductoDto[]> {
		const productos = await this.productoRepository.findAllAsycn();
		return this.mapper.mapArrayAsync(productos, Producto, ProductoDto);
	}
	async findByIdAsycn(id: number): Promise<ProductoDto> {
		const producto = await this.productoRepository.findByIdAsycn(id);
		if (!producto) {
			throw new NotFoundException(`producto con ID ${id} no encontrado.`);
		}
		return this.mapper.mapAsync(producto, Producto, ProductoDto);
	}
	async updateAsycn(id: number, savedto: ProductoSaveDto): Promise<ProductoDto> {
		const producto = await this.productoRepository.findByIdAsycn(id);

		if (!producto) {
			throw new NotFoundException(`producto con ID ${id} no encontrado.`);
		}
		this.mapper.mutateAsync(savedto, producto, ProductoSaveDto, Producto);
		const productoUpdate = await this.productoRepository.saveAsycn(producto);
		return this.mapper.mapAsync(productoUpdate, Producto, ProductoDto);
	}

	async deleteAsycn(id: number): Promise<ProductoDto> {
		const producto = await this.productoRepository.findByIdAsycn(id);
		if (!producto) {
			throw new NotFoundException(`producto con ID ${id} no encontrado.`);
		}
		producto.estado = false;
		const productoUpdate = await this.productoRepository.saveAsycn(producto);
		return this.mapper.mapAsync(productoUpdate, Producto, ProductoDto);
	}
	async createAsycn(savedto: ProductoSaveDto): Promise<ProductoDto> {
		const producto = this.mapper.map(savedto, ProductoSaveDto, Producto);
		producto.estado = true;
		const productoSave = await this.productoRepository.saveAsycn(producto);
		return this.mapper.mapAsync(productoSave, Producto, ProductoDto);
	}

	async createProductoCategoriaAsycn(savedto: ProductoCategoriaSaveDto): Promise<ProductoDto> {
		const producto = this.mapper.map(savedto, ProductoCategoriaSaveDto, Producto);
		producto.estado = true;
		producto.categoria.estado = true;
		const productoSave = await this.productoRepository.saveAsycn(producto);
		return this.mapper.mapAsync(productoSave, Producto, ProductoDto);
	}

	/*async createAsycn(savedto: ProductoSaveDto): Promise<Producto> {
		const categoria = new Categoria();
		categoria.nombre = 'Spay';
		categoria.descripcion = 'des spay';
		categoria.estado = true;

		const producto = new Producto();
		producto.nombre = savedto.nombre;
		producto.descripcion = savedto.descripcion;
		producto.stock = savedto.stock;
		producto.precio = savedto.precio;
		producto.estado = true;
		producto.categoria = categoria;
		const producotSave = await this.productoRepository.saveAsycn(producto);
		return producotSave;
	} */
	/*async createAsycn(savedto: ProductoSaveDto): Promise<Producto> {
		const producto = new Producto();
		producto.nombre = savedto.nombre;
		producto.descripcion = savedto.descripcion;
		producto.stock = savedto.stock;
		producto.precio = savedto.precio;
		producto.idCategoria = savedto.idCategoria;
		producto.estado = true;
		console.log('DATA>>>', savedto);
		const producotSave = await this.productoRepository.saveAsycn(producto);
		return producotSave;
	} */
}
