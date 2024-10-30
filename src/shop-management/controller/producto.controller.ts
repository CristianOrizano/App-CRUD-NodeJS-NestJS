import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductoService } from '../application/producto.service';
import { ProductoSaveDto } from '../application/dtos/Producto/producto.save.dto';
import { ProductoDto } from '../application/dtos/Producto/producto.dto';
import { ProductoCategoriaSaveDto } from '../application/dtos/Producto/producto.categ.dto';

@ApiTags('Producto')
@Controller('api/producto')
export class ProductoController {
	constructor(private readonly productoService: ProductoService) {}

	@Get()
	@ApiResponse({ status: 200, type: [ProductoDto] })
	@ApiResponse({ status: 404, description: 'No se encontraron prodcutos.' })
	async findAll(): Promise<ProductoDto[]> {
		return await this.productoService.findAllAsycn();
	}
	@Get(':id')
	@ApiResponse({ status: 200, type: ProductoDto })
	@ApiResponse({ status: 404, description: 'No se encontro Producto.' })
	async findOne(@Param('id') id: number): Promise<ProductoDto> {
		return await this.productoService.findByIdAsycn(id);
	}
	@Post()
	@HttpCode(201)
	@ApiResponse({ status: 201, type: ProductoDto, description: 'Creado' })
	@ApiResponse({ status: 400, description: 'Error en la creación de producto.' })
	async create(@Body() saveDto: ProductoSaveDto) {
		return await this.productoService.createAsycn(saveDto);
	}

	@Post('productoCategoria')
	@HttpCode(201)
	@ApiResponse({ status: 201, type: ProductoCategoriaSaveDto, description: 'Creado' })
	@ApiResponse({ status: 400, description: 'Error en la creación de producto.' })
	async createproductotwo(@Body() saveDto: ProductoCategoriaSaveDto) {
		return await this.productoService.createProductoCategoriaAsycn(saveDto);
	}

	@Put(':id')
	@HttpCode(200)
	@ApiResponse({ status: 200, type: ProductoSaveDto })
	@ApiResponse({ status: 400, description: 'Error en la actualizado de producto.' })
	async update(@Body() saveDto: ProductoSaveDto, @Param('id') id: number) {
		return await this.productoService.updateAsycn(id, saveDto);
	}

	@Delete(':id')
	@HttpCode(200)
	@ApiResponse({ status: 200, type: ProductoSaveDto })
	@ApiResponse({ status: 404, description: 'producto no encontrado.' })
	async delete(@Param('id') id: number): Promise<ProductoDto> {
		return await this.productoService.deleteAsycn(id);
	}
}
