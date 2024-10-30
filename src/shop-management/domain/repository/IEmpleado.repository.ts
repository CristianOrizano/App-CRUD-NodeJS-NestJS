import { PageResponse } from 'src/shop-management/shared/page/pageResponse';
import { Empleado } from '../empleado.entity';

export interface IEmpleadoRepository {
	findAllAsycn(): Promise<Empleado[]>;
	findByIdAsycn(id: number): Promise<Empleado>;
	createAsycn(empleado: Empleado): Promise<Empleado>;
	updateAsycn(id: number, empleado: Empleado): Promise<Empleado>;
	deleteAsycn(id: number): Promise<void>;
	paginated(empleado: Empleado, page: number, rows: number): Promise<PageResponse<Empleado>>;
}
