import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { Material } from './entities';
import { MeasurementUnit } from 'src/modules/measurement-units';
import { MeasurementUnitsService } from 'src/modules/measurement-units/measurement-units.service';


@Injectable()
export class MaterialsService {
  constructor (
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>,

    private readonly mUnitsService: MeasurementUnitsService
  ) {}

  notFoundExceptionMessage: string = "Material not found";

  verifyEntity(material: Material) {
    if (!material) throw new NotFoundException(this.notFoundExceptionMessage)
  }

  async create(createMaterialDto: CreateMaterialDto) {
    let mUnit: MeasurementUnit;

    if (createMaterialDto.measurementUnitId) {
      mUnit = await this
        .mUnitsService
        .findOne(createMaterialDto.measurementUnitId);
    }

    const material = this.materialRepository.create({
      code: createMaterialDto.code,
      name: createMaterialDto.name,
      description: createMaterialDto.description,
      measurementUnit: mUnit ? mUnit : null
    });

    return this.materialRepository.save(material);
  }

  findAll() {
    return this.materialRepository.find();
  }

  async findOne(id: number) {
    // get the material with the relation on the attr 'measurementUnit'
    const material: Material = await this.materialRepository
      .findOne({ where: { id: id }, relations: [ "measurementUnit" ]});

    this.verifyEntity(material);

    return material;
  }

  async update(id: number, updateMaterialDto: UpdateMaterialDto) {
    const material: Material = await this.materialRepository.findOneBy({ id: id });

    this.verifyEntity(material);

    Object.assign(material, updateMaterialDto);

    return this.materialRepository.save(material);
  }

  async remove(id: number) {
    const material: Material = await this.materialRepository.findOneBy({ id: id});

    this.verifyEntity(material);

    return this.materialRepository.remove(material);
  }
}
