import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity('tb_role')
export class Role {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 255, nullable: true })
	nombre: string;

	@OneToMany(() => Usuario, user => user.role)
	users: Usuario[];
}
