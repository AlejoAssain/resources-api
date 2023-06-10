import { InventoryTransaction } from "src/modules/inventory-transactions";
import { MeasurementUnit } from "src/modules/measurement-units";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
 } from "typeorm";


@Entity()
export class Material {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ nullable: false, unique: true})
  code: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @ManyToOne(
    type => MeasurementUnit,
    measurementUnit => measurementUnit.materials,
    { nullable: true }
  )
  @JoinColumn({ name: "measurement_unit_id"})
  measurementUnit: MeasurementUnit;

  @OneToMany(type => InventoryTransaction, iTransaction => iTransaction.material)
  inventoryTransactions: InventoryTransaction[];
}
