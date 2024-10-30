import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { IUsuarioService } from './repository/IUsuario.service';
import { UsuarioRepository } from '../infraestructure/usuario.repository';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { UsuarioLoginDto } from './dtos/Usuario/usuario.login.dto';
import { UsuarioSecurityDto } from './dtos/Usuario/usuario.security.dto';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from '../domain/usuario.entity';
import { UsuarioDto } from './dtos/Usuario/usuario.dto';
import { UsuariosaveDto } from './dtos/Usuario/usuario.save.dto';

@Injectable()
export class UsuarioService implements IUsuarioService {
	constructor(
		private readonly usuarioRepository: UsuarioRepository,
		private readonly jwtService: JwtService,
		@InjectMapper()
		private readonly mapper: Mapper,
	) {}

	async findAllAsycn(): Promise<UsuarioDto[]> {
		const usuarios = await this.usuarioRepository.findAllAsycn();
		return this.mapper.mapArrayAsync(usuarios, Usuario, UsuarioDto);
	}
	async createAsycn(savedto: UsuariosaveDto): Promise<UsuarioDto> {
		const usuario = this.mapper.map(savedto, UsuariosaveDto, Usuario);

		const user = await this.usuarioRepository.findByFieldAsync({ email: usuario.email });
		if (user) {
			throw new NotFoundException(`usuario con email ${user.email} ya esta registrado.`);
		}
		usuario.password = await bcryptjs.hash(usuario.password, 10);
		usuario.estado = true;
		const usuarioSave = await this.usuarioRepository.saveAsycn(usuario);
		return this.mapper.mapAsync(usuarioSave, Usuario, UsuarioDto);
	}

	async updateAsycn(id: number, savedto: UsuariosaveDto): Promise<UsuarioDto> {
		await bcryptjs.hash(savedto.password, 10);
		const usuario = await this.usuarioRepository.findByIdAsycn(id);
		if (!usuario) {
			throw new NotFoundException(`usuario con ID ${id} no encontrado.`);
		}
		this.mapper.mutateAsync(savedto, usuario, UsuariosaveDto, Usuario);
		usuario.password = await bcryptjs.hash(savedto.password, 10);

		const usuarioUpdate = await this.usuarioRepository.saveAsycn(usuario);
		return this.mapper.mapAsync(usuarioUpdate, Usuario, UsuarioDto);
	}

	async deleteAsycn(id: number): Promise<UsuarioDto> {
		const usuario = await this.usuarioRepository.findByIdAsycn(id);
		if (!usuario) {
			throw new NotFoundException(`usuario con ID ${id} no encontrado.`);
		}
		usuario.estado = false;

		const usuarioUpdate = await this.usuarioRepository.saveAsycn(usuario);
		return this.mapper.mapAsync(usuarioUpdate, Usuario, UsuarioDto);
	}

	async findByIdAsycn(id: number): Promise<UsuarioDto> {
		const usuario = await this.usuarioRepository.findByIdAsycn(id);
		if (!usuario) {
			throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
		}
		return this.mapper.mapAsync(usuario, Usuario, UsuarioDto);
	}

	async loginAsycn(login: UsuarioLoginDto): Promise<UsuarioSecurityDto> {
		const user = await this.usuarioRepository.findByFieldAsync({ email: login.email });
		if (!user) {
			throw new UnauthorizedException('email is wrong');
		}
		const isPasswordValid = await bcryptjs.compare(login.password, user.password);
		if (!isPasswordValid) {
			throw new UnauthorizedException('password is wrong');
		}
		const payload = { sub: user.id, email: user.email, role: user.role };
		const token = await this.jwtService.signAsync(payload);
		const usuarioDto = this.mapper.map(user, Usuario, UsuarioDto);

		const security = new UsuarioSecurityDto();
		(security.expiresAt = '2024-10-10'), (security.token = token), (security.usuario = usuarioDto);

		return security;
	}
}
