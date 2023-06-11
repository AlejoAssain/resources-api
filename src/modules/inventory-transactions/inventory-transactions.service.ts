import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateInventoryTransactionDto } from './dto/create-inventory-transaction.dto';
import { UpdateInventoryTransactionDto } from './dto/update-inventory-transaction.dto';
import { InventoryTransaction } from './entities';
import { MaterialsService } from 'src/modules/materials/materials.service';
import { TransactionTypesService } from 'src/modules/transaction-types/transaction-types.service';


@Injectable()
export class InventoryTransactionsService {
  constructor (
    @InjectRepository(InventoryTransaction)
    private readonly iTransactionRepository: Repository<InventoryTransaction>,

    private readonly materialsService: MaterialsService,
    private readonly transactionTypesService: TransactionTypesService,
  ) {}

  notFoundExceptionMessage: string = "Inventory transaction not found";

  verifyEntity(iTransaction: InventoryTransaction) {
    if (!iTransaction) throw new NotFoundException(this.notFoundExceptionMessage);
  }

  async create(createInventoryTransactionDto: CreateInventoryTransactionDto) {
    const iTransaction = this.iTransactionRepository.create({
      quantity: createInventoryTransactionDto.quantity,
      material: createInventoryTransactionDto.materialId ?
        await this.materialsService
          .findOne(createInventoryTransactionDto.materialId)
        : null,
      transactionType: createInventoryTransactionDto.transactionTypeId ?
        await this.transactionTypesService
          .findOne(createInventoryTransactionDto.transactionTypeId)
        : null
    });

    return this.iTransactionRepository.save(iTransaction);
  }

  findAll() {
    return this.iTransactionRepository.find();
  }

  async findOne(id: number) {
    const iTransaction = await this.iTransactionRepository.findOneBy({ id: id });

    this.verifyEntity(iTransaction);

    return iTransaction;
  }

  // TODO - calculate stock by materialId. add route to controller
  async getMaterialStock(materialId: number) {

  }
}
