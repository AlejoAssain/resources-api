import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InventoryTransactionsService } from './inventory-transactions.service';
import { CreateInventoryTransactionDto } from './dto/create-inventory-transaction.dto';
import { UpdateInventoryTransactionDto } from './dto/update-inventory-transaction.dto';

@Controller('inventory-transactions')
export class InventoryTransactionsController {
  constructor(private readonly inventoryTransactionsService: InventoryTransactionsService) {}

  @Post()
  create(@Body() createInventoryTransactionDto: CreateInventoryTransactionDto) {
    return this.inventoryTransactionsService.create(createInventoryTransactionDto);
  }

  @Get('/transaction')
  findAll() {
    return this.inventoryTransactionsService.findAll();
  }

  @Get('transaction/:id')
  findOne(@Param('id') id: string) {
    return this.inventoryTransactionsService.findOne(+id);
  }

  @Get('stock')
  getMaterialsStock() {
    return this.inventoryTransactionsService.getMaterialsStock();
  }

  @Get('stock/:materialId')
  getMaterialStock(@Param('materialId') materialId: string) {
    return this.inventoryTransactionsService.getMaterialStock(+materialId);
  }
}
