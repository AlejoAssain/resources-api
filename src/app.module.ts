import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MaterialsModule } from './modules/materials/materials.module';
import { InventoryTransactionsModule } from './modules/inventory-transactions/inventory-transactions.module';
import { TransactionTypesModule } from './modules/transaction-types/transaction-types.module';
import { MeasurementUnitsModule } from './modules/measurement-units/measurement-units.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './modules/users/users.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    MaterialsModule,
    InventoryTransactionsModule,
    TransactionTypesModule,
    MeasurementUnitsModule,
    DatabaseModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: number;

  constructor(private readonly configService: ConfigService) {
    AppModule.port = +this.configService.get("PORT") || 3000;
  }
}
