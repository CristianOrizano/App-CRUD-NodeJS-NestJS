import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from './usuario.entity';
import { AutoMap } from '@automapper/classes';

@Entity('tb_role')
export class Role {
	@AutoMap()
	@PrimaryGeneratedColumn()
	id: number;

	@AutoMap()
	@Column({ type: 'varchar', length: 255, nullable: true })
	nombre: string;

	@OneToMany(() => Usuario, user => user.role)
	users: Usuario[];
}
