import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';
import { EmpleadoService } from '../application/empleado.service';
import { EmpleadoDto } from '../application/dtos/Empleado/empleado.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EmpleadoSaveDto } from '../application/dtos/Empleado/empleado.save.dto';
import { PageResponse } from '../shared/page/pageResponse';
import { EmpleadoFilter } from '../application/dtos/Empleado/empleadoFilter.dto';

@ApiTags('Empleado')
@Controller('api/empleado')
export class EmpleadoController {
	constructor(private readonly empleadoService: EmpleadoService) {}

	@Get()
	@ApiOperation({
		summary: 'Obtener todos los empleados',
		description: 'Devuelve una lista de todos los empleados registrados.',
	})
	@ApiResponse({
		status: 200,
		description: 'Lista de empleados devuelta exitosamente.',
		type: [EmpleadoDto],
	})
	@ApiResponse({ status: 404, description: 'No se encontraron empleados.' })
	async findAll(): Promise<EmpleadoDto[]> {
		return await this.empleadoService.findAllAsycn();
	}

	@Get(':id')
	async findOne(@Param('id') id: number) {
		return await this.empleadoService.findByIdAsycn(id);
	}

	@Post()
	@HttpCode(201)
	@ApiResponse({ status: 201, description: 'Empleado creado exitosamente.', type: EmpleadoSaveDto })
	@ApiResponse({ status: 400, description: 'Error en la creación del empleado.' })
	async create(@Body() saveDto: EmpleadoSaveDto) {
		return await this.empleadoService.createAsycn(saveDto);
	}

	@Put(':id')
	@HttpCode(200)
	@ApiResponse({
		status: 200,
		description: 'Empleado actualizado exitosamente.',
		type: EmpleadoSaveDto,
	})
	@ApiResponse({ status: 400, description: 'Error en la actualizado del empleado.' })
	async update(@Body() saveDto: EmpleadoSaveDto, @Param('id') id: number) {
		return await this.empleadoService.updateAsycn(id, saveDto);
	}

	@Delete(':id')
	@HttpCode(200)
	@ApiResponse({ status: 204, description: 'Empleado eliminado exitosamente.' })
	@ApiResponse({ status: 404, description: 'Empleado no encontrado.' })
	async delete(@Param('id') id: number): Promise<{ message: string }> {
		return await this.empleadoService.deleteAsycn(id);
	}

	@Get('list/paginated')
	@ApiOperation({
		summary: 'Obtener empleados paginados',
		description: 'Devuelve una lista de empleados con opciones de paginación y filtrado.',
	})
	@ApiResponse({
		status: 200,
		description: 'Lista de empleados devuelta exitosamente.',
		type: [EmpleadoDto],
	})
	@ApiResponse({ status: 404, description: 'No se encontraron empleados.' })
	@ApiQuery({ name: 'page', required: false, description: 'Número de página para la paginación.' })
	@ApiQuery({
		name: 'rows',
		required: false,
		description: 'Número máximo de empleados por página.',
	})
	@ApiQuery({ name: 'nombre', required: false, description: 'Filtrar por nombre de empleado.' })
	@ApiQuery({ name: 'apellido', required: false, description: 'Filtrar por apellido de empleado.' })
	@ApiQuery({ name: 'fecha', required: false, description: 'Filtrar por fecha de empleado.' })
	@ApiQuery({ name: 'sueldo', required: false, description: 'Filtrar por sueldo de empleado.' })
	@ApiQuery({ name: 'telefono', required: false, description: 'Filtrar por telefono de empleado.' })
	async paginated(
		@Query('page') page: number,
		@Query('rows') rows: number,
		@Query('nombre') nombre: string,
		@Query('apellido') apellido: string,
		@Query('fecha') fecha: Date,
		@Query('sueldo') sueldo: number,
		@Query('telefono') telefono: number,
	): Promise<PageResponse<EmpleadoDto>> {
		//const sueldonu = parseInt(sueldo+"", 10) || 1;
		//const pageNumber = parseInt(page+"", 10) || 1;
		//const rowsNumber = parseInt(rows+"", 10) || 10;
		const filters: EmpleadoFilter = {
			rows: rows ?? 10,
			page: parseInt(page + '') || 1,
			nombre,
			apellido,
			fecha,
			sueldo,
			telefono,
		};
		return await this.empleadoService.paginated(filters);
	}
}
