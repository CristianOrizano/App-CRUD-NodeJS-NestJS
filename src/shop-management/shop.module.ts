import { Module } from '@nestjs/common';
import { EmpleadoService } from './application/empleado.service';
import { EmpleadoRepository } from './infraestructure/empleado.repository';
import { EmpleadoController } from './controller/empleado.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empleado } from './domain/empleado.entity';
import { EmpleadoProfile } from './application/dtos/Empleado/profile/empleado.profile';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { CategoriaService } from './application/categoria.service';
import { CategoriaRepository } from './infraestructure/categoria.repository';
import { CategoriaProfile } from './application/dtos/Categoria/profile/categoria.profile';
import { CategoriaController } from './controller/categoria.controller';
import { Categoria } from './domain/categoria.entity';
import { Producto } from './domain/producto.entity';
import { ProductoService } from './application/producto.service';
import { ProductoRepository } from './infraestructure/producto.repository';
import { ProductoProfile } from './application/dtos/Producto/profile/producto.profile';
import { ProductoController } from './controller/producto.controller';

@Module({
	imports: [
		// gestiona los repositorios de estas entidades en el contexto del módulo,
		// permitiéndote inyectar Repository<Categoria> y otros repositorios especificados en los servicios
		TypeOrmModule.forFeature([Empleado, Categoria, Producto]),
		AutomapperModule.forRoot({
			strategyInitializer: classes(),
		}),
	],
	providers: [
		EmpleadoService,
		EmpleadoRepository,
		EmpleadoProfile,
		CategoriaService,
		CategoriaRepository,
		CategoriaProfile,
		ProductoService,
		ProductoRepository,
		ProductoProfile,
	],
	controllers: [EmpleadoController, CategoriaController, ProductoController],
	exports: [EmpleadoService, EmpleadoRepository], // Exportar si es necesario usar estos en otros modulos
})
export class ShopModule {}
