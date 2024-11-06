import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './decorator/authorized.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		// Obtiene los roles requeridos para la ruta
		const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass(),
		]);

		// Si no hay roles específicos requeridos, permite el acceso
		if (!requiredRoles || requiredRoles.length === 0) {
			return true;
		}

		//request representa todos los detalles de una solicitud HTTP que llega al servidor.
		const request = context.switchToHttp().getRequest();
		// Obtiene el usuario del contexto de la solicitud
		const user = request.user;

		// Verifica si el usuario tiene el rol adecuado
		if (!user || !user.role.nombre || !requiredRoles.includes(user.role.nombre)) {
			throw new ForbiddenException('You do not have permission to access this resource');
		}

		return true;
	}
}
