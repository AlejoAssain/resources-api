import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateMeasurementUnitDto } from './dto/create-measurement-unit.dto';
import { UpdateMeasurementUnitDto } from './dto/update-measurement-unit.dto';
import { MeasurementUnit } from './entities';


@Injectable()
export class MeasurementUnitsService {
  constructor (
    @InjectRepository(MeasurementUnit)
    private readonly mUnitRepository: Repository<MeasurementUnit>
  ) {}

  notFoundExceptionMessage: string = "Measurement unit not found";

  verifyEntity(mUnit: MeasurementUnit) {
    if (!mUnit) throw new NotFoundException(this.notFoundExceptionMessage);
  }

  async create(createMUnitDto: CreateMeasurementUnitDto) {
    const mUnit: MeasurementUnit = this.mUnitRepository.create({
      name: createMUnitDto.name,
      abbreviation: createMUnitDto.abbreviation
    });

    try {
      await this.mUnitRepository.save(mUnit)
    } catch (e) {
      throw new HttpException(e.sqlMessage, 409);
    }

    return mUnit;
  }

  findAll() {
    return this.mUnitRepository.find();
  }

  async findOne(id: number) {
    const mUnit: MeasurementUnit = await this.mUnitRepository.findOneBy({ id: id });

    this.verifyEntity(mUnit);

    return mUnit;
  }

  async update(id: number, updateMeasurementUnitDto: UpdateMeasurementUnitDto) {
    const mUnit: MeasurementUnit = await this.mUnitRepository.findOneBy({ id: id})

    this.verifyEntity(mUnit);

    Object.assign(mUnit, updateMeasurementUnitDto);

    return this.mUnitRepository.save(mUnit);
  }

  async remove(id: number) {
    const mUnit: MeasurementUnit = await this.mUnitRepository.findOneBy({ id: id})

    this.verifyEntity(mUnit);

    return this.mUnitRepository.remove(mUnit);
  }
}
