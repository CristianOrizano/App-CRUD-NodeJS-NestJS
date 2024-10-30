import { AutoMap } from '@automapper/classes';
import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Producto } from './producto.entity';

@Entity('tb_categoria')
export class Categoria {
	@AutoMap()
	@PrimaryGeneratedColumn()
	id: number;
	@AutoMap()
	@Column()
	nombre: string;
	@AutoMap()
	@Column()
	descripcion: string;
	@AutoMap()
	@Column({
		name: 'estado',
		type: 'bit',
		transformer: { from: (v: Buffer) => !!v.readInt8(0), to: v => v },
	})
	estado: boolean;
	//una Categoria tiene muchos Productos
	//inverso(un producto una categoria)
	@OneToMany(() => Producto, producto => producto.categoria)
	@Exclude() // Evita la serialización de esta propiedad
	productos: Producto[];
}
