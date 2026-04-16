import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OperationsService } from "./operations.service";
import { OperationsController } from "./operations.controller";
import { Deliveries } from "../entities/Deliveries";
import { Authorization } from "../entities/Authorization";
import { LoggerService } from "../logger/logger.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Deliveries,
      Authorization,
    ]),
  ],
  controllers: [OperationsController],
  providers: [OperationsService, LoggerService],
  exports: [OperationsService],
})
export class OperationsModule { }
