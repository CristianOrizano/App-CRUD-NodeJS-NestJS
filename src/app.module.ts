import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empleado } from './shop-management/domain/empleado.entity';
import { ShopModule } from './shop-management/shop.module';
import { Categoria } from './shop-management/domain/categoria.entity';
import { Producto } from './shop-management/domain/producto.entity';
import { AuthModule } from './auth/auth.module';
import { Usuario } from './auth/domain/usuario.entity';
import { Role } from './auth/domain/role.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthJWTGuard } from './auth/guard/auth.guard';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'mysql', // Especifica que usarás MySQL
			host: 'localhost', // Host de tu servidor MySQL
			port: 3306, // Puerto por defecto de MySQL
			username: 'root', // Usuario de la base de datos
			password: 'mysql', // Contraseña de la base de datos
			database: 'node_back', // Nombre de la base de datos
			entities: [Empleado, Categoria, Producto, Usuario, Role],
			synchronize: false, // Sincroniza las entidades con la base de datos (solo para desarrollo)
		}),
		ShopModule,
		AuthModule,
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: AuthJWTGuard,
		},
	],
})
export class AppModule {}
