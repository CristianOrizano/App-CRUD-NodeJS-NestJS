import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.entity';
import { AutoMap } from '@automapper/classes';

@Entity('tb_usuario')
export class Usuario {
	@AutoMap()
	@PrimaryGeneratedColumn()
	id: number;
	@AutoMap()
	@Column({ type: 'varchar', length: 255, nullable: true })
	nombre: string;
	@AutoMap()
	@Column({ type: 'varchar', length: 255, nullable: true })
	apellido: string;
	@AutoMap()
	@Column({ type: 'varchar', length: 255, unique: true, nullable: true })
	email: string;
	@AutoMap()
	@Column({ type: 'varchar', length: 255, nullable: true })
	password: string;
	@AutoMap()
	@Column({ type: 'int', nullable: true })
	idRole: number;

	@AutoMap()
	@Column({ type: 'bit', nullable: true, transformer: { from: (v: Buffer) => !!v.readInt8(0), to: v => v } })
	estado: boolean;

	@ManyToOne(() => Role, role => role.users, { onDelete: 'SET NULL' }) // Define la relación con Role
	@JoinColumn({ name: 'idRole' })
	role: Role;
}
