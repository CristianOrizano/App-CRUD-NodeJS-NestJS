import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoriaService } from '../application/categoria.service';
import { CategoriaDto } from '../application/dtos/Categoria/categoria.dto';
import { CategoriaSaveDto } from '../application/dtos/Categoria/categoria.save.dto';
import { PageResponse } from '../shared/page/pageResponse';
import { CategoriaFilter } from '../application/dtos/Categoria/categoria.filter.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Categoria')
@Controller('api/categoria')
@ApiBearerAuth('jwt')
export class CategoriaController {
	constructor(private readonly categoriaService: CategoriaService) {}

	@Get()
	//@UseGuards(AuthGuard('jwt'))
	@ApiResponse({ status: 200, type: [CategoriaDto] })
	@ApiResponse({ status: 404, description: 'No se encontraron categorias.' })
	async findAll(): Promise<CategoriaDto[]> {
		return await this.categoriaService.findAllAsycn();
	}

	@Get(':id')
	@ApiResponse({ status: 200, type: CategoriaDto })
	@ApiResponse({ status: 404, description: 'No se encontro categoria.' })
	async findOne(@Param('id') id: number): Promise<CategoriaDto> {
		return await this.categoriaService.findByIdAsycn(id);
	}

	@Post()
	@HttpCode(201)
	@ApiResponse({ status: 201, type: CategoriaDto, description: 'Creado' })
	@ApiResponse({ status: 400, description: 'Error en la creación de categoria.' })
	async create(@Body() saveDto: CategoriaSaveDto) {
		return await this.categoriaService.createAsycn(saveDto);
	}

	@Put(':id')
	@HttpCode(200)
	@ApiResponse({ status: 200, type: CategoriaDto })
	@ApiResponse({ status: 400, description: 'Error en la actualizado de categoria.' })
	async update(@Body() saveDto: CategoriaSaveDto, @Param('id') id: number) {
		return await this.categoriaService.updateAsycn(id, saveDto);
	}

	@Delete(':id')
	@HttpCode(200)
	@ApiResponse({ status: 200, type: CategoriaDto })
	@ApiResponse({ status: 404, description: 'Categoria no encontrado.' })
	async delete(@Param('id') id: number): Promise<CategoriaDto> {
		return await this.categoriaService.deleteAsycn(id);
	}

	@Get('list/paginated')
	@ApiOperation({
		summary: 'Obtener empleados paginados',
		description: 'Devuelve una lista de categorias con opciones de paginación y filtrado.',
	})
	@ApiResponse({ status: 200, type: [CategoriaDto] })
	@ApiResponse({ status: 404, description: 'No se encontraron empleados.' })
	@ApiQuery({ name: 'page', required: false, type: Number })
	@ApiQuery({ name: 'rows', required: false, type: Number })
	@ApiQuery({ name: 'nombre', required: false })
	@ApiQuery({ name: 'descripcion', required: false })
	@ApiQuery({ name: 'estado', required: false, type: Boolean })
	async paginated(
		@Query('page') page: string,
		@Query('rows') rows: string,
		@Query('nombre') nombre: string,
		@Query('descripcion') descripcion: string,
		@Query('estado') estado?: string,
	): Promise<PageResponse<CategoriaDto>> {
		console.log(typeof page);
		console.log(typeof rows);
		// Convertir a number
		const pageNumber = parseInt(page, 10) || 1; // Convertir a number, usar 1 como default
		const rowsNumber = parseInt(rows, 10) || 10; // Convertir a number, usar 10 como default
		// Convertir estado a booleano
		const estadoBoolean = estado === 'true' ? true : estado === 'false' ? false : undefined;

		const filters: CategoriaFilter = {
			rows: rowsNumber,
			page: pageNumber,
			nombre,
			descripcion,
			estado: estadoBoolean,
		};
		return await this.categoriaService.paginated(filters);
	}
}
