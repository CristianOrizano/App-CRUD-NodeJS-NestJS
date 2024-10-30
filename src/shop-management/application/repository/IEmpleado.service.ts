import { EmpleadoDto } from '../dtos/Empleado/empleado.dto';
import { EmpleadoSaveDto } from '../dtos/Empleado/empleado.save.dto';
import { EmpleadoFilter } from '../dtos/Empleado/empleadoFilter.dto';

export interface IEmpleadoService {
	findAllAsycn(): Promise<EmpleadoDto[]>;
	findByIdAsycn(id: number): Promise<EmpleadoDto>;
	createAsycn(savedto: EmpleadoSaveDto): Promise<EmpleadoDto>;
	updateAsycn(id: number, savedto: EmpleadoSaveDto): Promise<EmpleadoDto>;
	deleteAsycn(id: number): Promise<{ message: string }>;
	paginated(filters?: EmpleadoFilter);
}
