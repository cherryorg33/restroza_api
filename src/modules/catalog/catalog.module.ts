import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CatalogService } from "./catalog.service";
import { CatalogController } from "./catalog.controller";
import { Products } from "../entities/Products";
import { Categories } from "../entities/Categories";
import { Uom } from "../entities/Uom";
import { LoggerService } from "../logger/logger.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Products,
      Categories,
      Uom,
    ]),
  ],
  controllers: [CatalogController],
  providers: [CatalogService, LoggerService],
  exports: [CatalogService],
})
export class CatalogModule { }
