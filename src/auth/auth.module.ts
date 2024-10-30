import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './domain/usuario.entity';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsuarioService } from './application/usuario.service';
import { UsuarioRepository } from './infraestructure/usuario.repository';
import { UsuarioProfile } from './application/dtos/Usuario/profile/usuario.profile';
import { Role } from './domain/role.entity';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './controller/auth.controller';
import { UsuarioController } from './controller/usuario.controller';

@Module({
	imports: [
		TypeOrmModule.forFeature([Usuario, Role]),
		AutomapperModule.forRoot({
			strategyInitializer: classes(),
		}),
		PassportModule,
		JwtModule.register({
			global: true,
			secret: 'clave-secreta',
			signOptions: { expiresIn: '1h' }, // Expiración del token
		}),
	],
	providers: [UsuarioService, UsuarioRepository, UsuarioProfile, JwtStrategy],
	controllers: [AuthController, UsuarioController],
	exports: [],
})
export class AuthModule {}