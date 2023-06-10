import { Material } from "src/modules/materials";
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";


@Entity()
export class MeasurementUnit {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  abbreviation: string;

  @OneToMany(type => Material, material => material.id)
  materials: Material[];
}
