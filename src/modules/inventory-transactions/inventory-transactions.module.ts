import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InventoryTransactionsService } from './inventory-transactions.service';
import { InventoryTransactionsController } from './inventory-transactions.controller';
import { InventoryTransaction } from './entities';
import { MaterialsModule } from 'src/modules/materials/materials.module';
import { MaterialsService } from 'src/modules/materials/materials.service';
import { Material } from 'src/modules/materials';
import { TransactionTypesModule } from 'src/modules/transaction-types/transaction-types.module';
import { TransactionTypesService } from 'src/modules/transaction-types/transaction-types.service';
import { TransactionType } from 'src/modules/transaction-types';
import { MeasurementUnitsModule } from 'src/modules/measurement-units/measurement-units.module';
import { MeasurementUnitsService } from 'src/modules/measurement-units/measurement-units.service';
import { MeasurementUnit } from 'src/modules/measurement-units';


@Module({
  imports: [
    TypeOrmModule.forFeature([InventoryTransaction, Material, TransactionType, MeasurementUnit]),
    MaterialsModule,
    TransactionTypesModule,
    MeasurementUnitsModule
  ],
  controllers: [InventoryTransactionsController],
  providers: [
    InventoryTransactionsService,
    MaterialsService,
    TransactionTypesService,
    MeasurementUnitsService
  ]
})
export class InventoryTransactionsModule {}
