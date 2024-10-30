import { Injectable, NotFoundException } from '@nestjs/common';
import { IEmpleadoService } from './repository/IEmpleado.service';
import { EmpleadoDto } from './dtos/Empleado/empleado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EmpleadoRepository } from 'src/shop-management/infraestructure/empleado.repository';
import { Empleado } from 'src/shop-management/domain/empleado.entity';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { EmpleadoSaveDto } from './dtos/Empleado/empleado.save.dto';
import { EmpleadoFilter } from './dtos/Empleado/empleadoFilter.dto';
import { PageResponse } from '../shared/page/pageResponse';

@Injectable()
export class EmpleadoService implements IEmpleadoService {
	constructor(
		private readonly empleadoRepository: EmpleadoRepository,
		@InjectMapper()
		private readonly mapper: Mapper, // Inyectar el mapper
	) {}

	async paginated(filters: EmpleadoFilter): Promise<PageResponse<EmpleadoDto>> {
		const empleado = new Empleado();
		empleado.nombre = filters.nombre;
		empleado.apellido = filters.apellido;
		empleado.sueldo = filters.sueldo;
		empleado.telefono = filters.telefono;
		empleado.fechaNacimiento = filters.fecha;
		const empleados = await this.empleadoRepository.paginated(empleado, filters.page, filters.rows);
		const mappedData = await this.mapper.mapArrayAsync(empleados.data, Empleado, EmpleadoDto);
		return {
			data: mappedData,
			page: empleados.page,
			rows: empleados.rows,
			total: empleados.total,
		} as PageResponse<EmpleadoDto>;
	}

	async findByIdAsycn(id: number): Promise<EmpleadoDto> {
		const empleado = await this.empleadoRepository.findByIdAsycn(id);
		// Verifica si el empleado no fue encontrado
		if (!empleado) {
			throw new NotFoundException(`Empleado con ID ${id} no encontrado.`);
		}
		return this.mapper.mapAsync(empleado, Empleado, EmpleadoDto);
	}

	async createAsycn(savedto: EmpleadoSaveDto): Promise<EmpleadoDto> {
		const empleado = this.mapper.map(savedto, EmpleadoSaveDto, Empleado);
		const empleadoSave = await this.empleadoRepository.createAsycn(empleado);
		return this.mapper.mapAsync(empleadoSave, Empleado, EmpleadoDto);
	}

	async updateAsycn(id: number, save: EmpleadoSaveDto): Promise<EmpleadoDto> {
		const empleado = await this.empleadoRepository.findByIdAsycn(id);
		// Verifica si el empleado no fue encontrado
		if (!empleado) {
			throw new NotFoundException(`Empleado con ID ${id} no encontrado.`);
		}

		this.mapper.mutateAsync(
			save, // Objeto de origen (EmpleadoSaveDto)
			empleado, // Objeto de destino (Empleado)
			EmpleadoSaveDto, // Identificador del modelo de origen
			Empleado, // Identificador del modelo de destino
		);
		const empleadoSave = await this.empleadoRepository.createAsycn(empleado);
		return this.mapper.mapAsync(empleadoSave, Empleado, EmpleadoDto);
	}

	async findAllAsycn(): Promise<EmpleadoDto[]> {
		const empleados = await this.empleadoRepository.findAllAsycn();

		return this.mapper.mapArrayAsync(empleados, Empleado, EmpleadoDto);
	}
	async deleteAsycn(id: number): Promise<{ message: string }> {
		const empleado = await this.empleadoRepository.findByIdAsycn(id);

		if (!empleado) {
			throw new NotFoundException(`Empleado con ID ${id} no encontrado.`);
		}

		await this.empleadoRepository.deleteAsycn(id);
		// Devuelve un mensaje de éxito
		return { message: 'Empleado eliminado exitosamente.' };
	}
}
