import { IsString } from "class-validator";


export class CreateMeasurementUnitDto {
  @IsString()
  name: string;

  @IsString()
  abbreviation: string;
}
