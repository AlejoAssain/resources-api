import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MaterialsService } from './materials.service';
import { MaterialsController } from './materials.controller';
import { Material } from './entities';
import { MeasurementUnit } from 'src/modules/measurement-units/entities';
import { InventoryTransaction } from 'src/modules/inventory-transactions/entities';
import { MeasurementUnitsModule } from 'src/modules/measurement-units/measurement-units.module';
import { MeasurementUnitsService } from 'src/modules/measurement-units/measurement-units.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([Material, MeasurementUnit, InventoryTransaction]),
    MeasurementUnitsModule
  ],
  controllers: [MaterialsController],
  providers: [
    MaterialsService,
    MeasurementUnitsService
  ]
})
export class MaterialsModule {}
