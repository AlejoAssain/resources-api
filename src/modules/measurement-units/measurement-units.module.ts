import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MeasurementUnitsService } from './measurement-units.service';
import { MeasurementUnitsController } from './measurement-units.controller';
import { MeasurementUnit } from './entities';
import { Material } from 'src/modules/materials/entities';


@Module({
  imports: [TypeOrmModule.forFeature([MeasurementUnit, Material])],
  controllers: [MeasurementUnitsController],
  providers: [MeasurementUnitsService]
})
export class MeasurementUnitsModule {}
