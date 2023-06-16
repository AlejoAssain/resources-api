import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateInventoryTransactionDto } from './dto/create-inventory-transaction.dto';
import { UpdateInventoryTransactionDto } from './dto/update-inventory-transaction.dto';
import { InventoryTransaction } from './entities';
import { MaterialsService } from 'src/modules/materials/materials.service';
import { TransactionTypesService } from 'src/modules/transaction-types/transaction-types.service';


interface MaterialStockData {
  add: number;
  remove: number;
}

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
      material: await this.materialsService
        .findOne(createInventoryTransactionDto.materialId),
      transactionType: await this.transactionTypesService
        .findOne(createInventoryTransactionDto.transactionTypeId)
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

  // TODO - obtain the stock of all the materials by id
  async getMaterialsStock() {
    const dbQuery = `
      SELECT it.material_id,
        SUM(CASE
            WHEN tt.code = 'ADD' THEN it.quantity
            WHEN tt.code = 'REMOVE' THEN -it.quantity
            ELSE 0
          END) AS stock
      FROM inventory_transaction it
        JOIN transaction_type tt ON it.transaction_type_id = tt.id
      GROUP BY it.material_id;
    `

    const dbResponse = await this.iTransactionRepository.query(dbQuery);

    return dbResponse;

  }

  async getMaterialStock(materialId: number) {
    /*
      get sum of transactions by material_id id

      SELECT tt.code, SUM(it.quantity) AS value
      FROM inventory_transaction it JOIN transaction_type tt
        ON it.transaction_type_id = tt.id
      WHERE material_id = 3
      GROUP BY tt.code;
    */
    const dbResponse = await this.iTransactionRepository
      .createQueryBuilder('it')
      .select('tt.code, SUM(it.quantity)', 'value')
      .leftJoin('it.transactionType', 'tt')
      .where('it.material_id = :materialId', { materialId: materialId })
      .groupBy('tt.code')
      .getRawMany();

    const stockData: MaterialStockData = { add: 0, remove: 0 };

    for (let row of dbResponse) {
      if (row.code.toLowerCase() === "add") {
        stockData.add = +row.value;
      } else if (row.code.toLowerCase() === "remove") {
        stockData.remove = +row.value;
      }
    }

    return {
      stock: stockData.add - stockData.remove
    };
  }
}
