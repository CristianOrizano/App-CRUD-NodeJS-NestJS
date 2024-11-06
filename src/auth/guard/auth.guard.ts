import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from './decorator/auth.decorator';

@Injectable()
export class AuthJWTGuard extends AuthGuard('jwt') {
	//Usa Reflector para leer metadatos
	constructor(private reflector: Reflector) {
		super();
	}
	//Método que se llama al recibir una solicitud
	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		//Esto hace que el guardia permita el acceso a las rutas que tengan el decorador @Public(),
		// mientras que las demás requerirán un token JWT válido.
		//getAllAndOverride busca el metadato isPublic en controller, si lo encuentra con true, permite el acceso.
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass(),
		]);
		if (isPublic) {
			return true;
		}

		// Si no es pública, delega a la lógica de Passport para validar el token JWT(Strategy)
		return super.canActivate(context);
	}
}
