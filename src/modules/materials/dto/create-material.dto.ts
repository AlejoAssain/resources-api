import { IsNumber, IsOptional, IsString,  } from "class-validator";

export class CreateMaterialDto {
  @IsString()
  code: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  measurementUnitId: number;
}
