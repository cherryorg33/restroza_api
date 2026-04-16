import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InventoryService } from "./inventory.service";
import { InventoryController } from "./inventory.controller";
import { Stockledger } from "../entities/Stockledger";
import { Purchases } from "../entities/Purchases";
import { Purchaseitems } from "../entities/Purchaseitems";
import { LoggerService } from "../logger/logger.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Stockledger,
      Purchases,
      Purchaseitems,
    ]),
  ],
  controllers: [InventoryController],
  providers: [InventoryService, LoggerService],
  exports: [InventoryService],
})
export class InventoryModule { }
