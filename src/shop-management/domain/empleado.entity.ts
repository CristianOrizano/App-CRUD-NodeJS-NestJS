import { AutoMap } from "@automapper/classes";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tb_empleado')
export class Empleado {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 255 })
  apellido: string;

  @AutoMap()
  @Column({ type: 'decimal'})
  sueldo: number;

  @AutoMap()
  @Column({ name: 'fecha_nacimiento', type: 'datetime' })
  fechaNacimiento: Date;

  @AutoMap()
  @Column()
  telefono: number;
}