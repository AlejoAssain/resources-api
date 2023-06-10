import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTransactionTypeDto } from './dto/create-transaction-type.dto';
import { UpdateTransactionTypeDto } from './dto/update-transaction-type.dto';
import { TransactionType } from './entities';


@Injectable()
export class TransactionTypesService {
  constructor (
    @InjectRepository(TransactionType)
    private readonly tTypeRepository: Repository<TransactionType>
  ) {}

  notFoundExceptionMessage: string = "Transaction type not found";

  verifyEntity(tType: TransactionType) {
    if (!tType) throw new NotFoundException(this.notFoundExceptionMessage);
  }

  async create(createTransactionTypeDto: CreateTransactionTypeDto) {
    const tType = this.tTypeRepository.create({
      code: createTransactionTypeDto.code,
      action: createTransactionTypeDto.action,
    });

    try {
      await this.tTypeRepository.save(tType);
    } catch (e) {
      throw new HttpException(e.sqlMessage, 409);
    }

    return tType;
  }

  findAll() {
    return this.tTypeRepository.find();
  }

  async findOne(id: number) {
    const tType = await this.tTypeRepository.findOneBy({ id: id });

    this.verifyEntity(tType);

    return tType;
  }

  async update(id: number, updateTransactionTypeDto: UpdateTransactionTypeDto) {
    const tType = await this.tTypeRepository.findOneBy({ id: id });

    this.verifyEntity(tType);

    Object.assign(tType, updateTransactionTypeDto);

    return this.tTypeRepository.save(tType);
  }

  async remove(id: number) {
    const tType: TransactionType = await this.tTypeRepository.findOneBy({ id: id});

    this.verifyEntity(tType);

    return this.tTypeRepository.remove(tType);
  }
}
