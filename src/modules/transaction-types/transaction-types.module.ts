import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TransactionTypesService } from './transaction-types.service';
import { TransactionTypesController } from './transaction-types.controller';
import { TransactionType } from './entities';
import { InventoryTransaction } from 'src/modules/inventory-transactions/entities';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionType, InventoryTransaction])],
  controllers: [TransactionTypesController],
  providers: [TransactionTypesService]
})
export class TransactionTypesModule {}
