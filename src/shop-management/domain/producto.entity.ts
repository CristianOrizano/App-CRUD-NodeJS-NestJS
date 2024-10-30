import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Categoria } from './categoria.entity';
import { AutoMap } from '@automapper/classes';
import { CategoriaSimpleDto } from '../application/dtos/Categoria/categoria.simple.dto';

@Entity('tb_producto')
export class Producto {
	@AutoMap()
	@PrimaryGeneratedColumn()
	id: number;

	@AutoMap()
	@Column({ type: 'varchar', length: 255, nullable: true })
	nombre: string;

	@AutoMap()
	@Column({ type: 'varchar', length: 255, nullable: true })
	descripcion: string;

	@AutoMap()
	@Column({ type: 'int', nullable: true })
	stock: number;

	@AutoMap()
	@Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
	precio: number;

	@AutoMap()
	@Column({ type: 'bit', nullable: true, transformer: { from: (v: Buffer) => !!v.readInt8(0), to: v => v } })
	estado: boolean;
	//muchos Productos tienen una Categoria
	//inverso(una categoria asociado a muchos productos)
	@AutoMap(() => Categoria)
	@ManyToOne(() => Categoria, categoria => categoria.productos, { cascade: true, nullable: true })
	@JoinColumn({ name: 'id_categoria', referencedColumnName: 'id' })
	categoria: Categoria; // Relación con la entidad Categoria

	@AutoMap()
	@Column({ name: 'id_categoria', type: 'int', nullable: true })
	idCategoria: number;
}
