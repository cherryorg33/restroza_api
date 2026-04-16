import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SalesService } from "./sales.service"
import { SalesController } from "./sales.controller";
import { Orders } from "../entities/Orders";
import { Orderitems } from "../entities/Orderitems";
import { Orderstatuses } from "../entities/Orderstatuses";
import { Ordertypes } from "../entities/Ordertypes";
import { LoggerService } from "../logger/logger.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Orders,
      Orderitems,
      Orderstatuses,
      Ordertypes,
    ]),
  ],
  controllers: [SalesController],
  providers: [SalesService, LoggerService],
  exports: [SalesService],
})
export class SalesModule { }
