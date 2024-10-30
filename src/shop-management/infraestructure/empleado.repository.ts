import { InjectRepository } from '@nestjs/typeorm';
import { Empleado } from '../domain/empleado.entity';
import { IEmpleadoRepository } from '../domain/repository/IEmpleado.repository';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { EmpleadoFilter } from '../application/dtos/Empleado/empleadoFilter.dto';
import { PageResponse } from '../shared/page/pageResponse';
import { EmpleadoDto } from '../application/dtos/Empleado/empleado.dto';

@Injectable()
export class EmpleadoRepository implements IEmpleadoRepository {
	constructor(
		@InjectRepository(Empleado)
		private empleadoRepository: Repository<Empleado>,
	) {}

	async paginated(empleado: Empleado, page: number, rows: number): Promise<PageResponse<Empleado>> {
		// Obtener el total de registros sin aplicar filtros
		const total = await this.empleadoRepository.createQueryBuilder('empleado').getCount();
		// QueryBuilder. Esto permite construir consultas SQL de manera programática y
		//fluida en JavaScript o TypeScript.
		const queryBuilder = this.empleadoRepository.createQueryBuilder('empleado');
		if (empleado?.nombre) {
			queryBuilder.andWhere('empleado.nombre LIKE :nombre', { nombre: `%${empleado.nombre}%` });
		}
		if (empleado?.apellido) {
			queryBuilder.andWhere('empleado.apellido LIKE :apellido', { apellido: `%${empleado.apellido}%` });
		}
		if (empleado?.sueldo) {
			queryBuilder.andWhere('empleado.sueldo >= :sueldo', { sueldo: empleado.sueldo });
		}
		if (empleado?.fechaNacimiento) {
			//  filtrar por una fecha específica o un rango de fechas.
			queryBuilder.andWhere('empleado.fecha_nacimiento = :fechaNacimiento', {
				fechaNacimiento: empleado.fechaNacimiento,
			});
			// filtrar por un rango de fechas, ajustar este filtro:
			// queryBuilder.andWhere('empleado.fecha_nacimiento BETWEEN :fechaInicio AND :fechaFin', { fechaInicio: '2023-01-01', fechaFin: '2023-12-31' });
		}
		if (empleado?.telefono) {
			queryBuilder.andWhere('empleado.telefono = :telefono', { telefono: empleado.telefono });
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

	async findAllAsycn(): Promise<Empleado[]> {
		return await this.empleadoRepository.find();
	}

	async findByIdAsycn(id: number): Promise<Empleado> {
		return await this.empleadoRepository.findOne({ where: { id } });
	}
	async createAsycn(empleado: Empleado): Promise<Empleado> {
		return await this.empleadoRepository.save(empleado);
	}
	updateAsycn(id: number, empleado: Empleado): Promise<Empleado> {
		throw new Error('Method not implemented.');
	}
	async deleteAsycn(id: number): Promise<void> {
		await this.empleadoRepository.delete(id);
	}
}
