import { IsNumber } from "class-validator";

export class CreateInventoryTransactionDto {
  @IsNumber()
  quantity: number;

  @IsNumber()
  materialId: number;

  @IsNumber()
  transactionTypeId: number;
}
