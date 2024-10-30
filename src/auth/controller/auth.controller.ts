import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsuarioService } from '../application/usuario.service';
import { Public } from '../guard/decorator/auth.decorator';
import { UsuarioLoginDto } from '../application/dtos/Usuario/usuario.login.dto';
import { UsuarioSecurityDto } from '../application/dtos/Usuario/usuario.security.dto';

@ApiTags('Login')
@Controller('api/auth')
export class AuthController {
	constructor(private readonly usuarioService: UsuarioService) {}

	@ApiResponse({ status: 201, type: UsuarioSecurityDto, description: 'auth' })
	@ApiResponse({ status: 400, description: 'Error en la autenticacion.' })
	@Post('login')
	@Public()
	login(@Body() loginDto: UsuarioLoginDto) {
		return this.usuarioService.loginAsycn(loginDto);
	}
}
