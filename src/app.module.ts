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
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RolesGuard } from './auth/guard/authorized.guard';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true, // Hace que el módulo Config sea accesible globalmente
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				type: 'mysql', // Especifica que usarás MySQL
				host: configService.get<string>('DB_HOST', 'localhost'), // Host de tu servidor MySQL
				port: configService.get<number>('DB_PORT'), // Puerto por defecto de MySQL
				username: configService.get<string>('DB_USERNAME'), // Usuario de la base de datos
				password: configService.get<string>('DB_PASSWORD'), // Contraseña de la base de datos
				database: configService.get<string>('DB_NAME'), // Nombre de la base de datos
				entities: [__dirname + '/**/*.entity{.ts,.js}'], // Carga todas las entidades automáticamente
				//entities: [Empleado, Categoria, Producto, Usuario, Role],
				synchronize: false, // Sincroniza las entidades con la base de datos (solo para desarrollo)
			}),
		}),
		ShopModule,
		AuthModule,
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: AuthJWTGuard,
		},
		{
			provide: APP_GUARD,
			useClass: RolesGuard,
		},
	],
})
export class AppModule {}
