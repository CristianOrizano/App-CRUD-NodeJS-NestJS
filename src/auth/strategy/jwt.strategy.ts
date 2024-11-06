import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsuarioService } from '../application/usuario.service';
import { ConfigService } from '@nestjs/config';

//actua como el filtro de autenticacion
// ya q intercepta el token para su validacion
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly userService: UsuarioService,
		private readonly configService: ConfigService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get<string>('JWT_SECRET'),
		});
	}
	//Este metodo es llamado automaticamente por la estrategia una vez que el token es verificado,
	//su función principal es retornar los datos que se adjuntaran a la solicitud como el usuario autenticado.
	//payload: contiene la información del token, como el id y otros datos del usuario
	//Lo que sea retornado por validate estará disponible en req.user
	async validate(payload: any) {
		// Buscar el usuario en la base de datos usando el ID del payload
		const user = await this.userService.findByIdAsycn(payload.sub);
		console.log('USUARIO', JSON.stringify(user));
		// Verificar si el usuario existe y si está activo
		if (!user || user.estado !== true) {
			throw new UnauthorizedException('User is not active or does not exist');
		}
		return user;
	}
}
