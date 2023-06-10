import { Material } from "src/modules/materials";
import { TransactionType } from "src/modules/transaction-types";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";


@Entity()
export class InventoryTransaction {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  quantity: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @ManyToOne( type => Material, material => material.inventoryTransactions )
  @JoinColumn({ name: "material_id" })
  material: Material;

  @ManyToOne( type => TransactionType, tType => tType.inventoryTransactions )
  @JoinColumn({ name: "transaction_type_id" })
  transactionType: TransactionType;
}
