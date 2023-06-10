import { InventoryTransaction } from "src/modules/inventory-transactions";
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";


@Entity()
export class TransactionType {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  action: string;

  @OneToMany( type => InventoryTransaction, iTransaction => iTransaction.transactionType )
  inventoryTransactions: InventoryTransaction[];
}
