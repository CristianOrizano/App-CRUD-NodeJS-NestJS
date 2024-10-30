import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from './decorator/auth.decorator';

@Injectable()
export class AuthJWTGuard extends AuthGuard('jwt') {
	constructor(private reflector: Reflector) {
		super();
	}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		//Esto hace que el guardia permita el acceso a las rutas que tengan el decorador @Public(),
		// mientras que las demás requerirán un token JWT válido.
		//getAllAndOverride busca el metadato isPublic y, si lo encuentra con un valor true, permite el acceso sin requerir autenticación.
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass(),
		]);
		if (isPublic) {
			return true;
		}
		//---
		return super.canActivate(context);
	}
}
