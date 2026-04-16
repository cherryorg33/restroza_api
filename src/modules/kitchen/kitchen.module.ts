import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { KitchenService } from "./kitchen.service";
import { KitchenController } from "./kitchen.controller";
import { Kot } from "../entities/Kot";
import { Kotitems } from "../entities/Kotitems";
import { Recipes } from "../entities/Recipes";
import { Recipeitems } from "../entities/Recipeitems";
import { LoggerService } from "../logger/logger.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Kot,
      Kotitems,
      Recipes,
      Recipeitems,
    ]),
  ],
  controllers: [KitchenController],
  providers: [KitchenService, LoggerService],
  exports: [KitchenService],
})
export class KitchenModule { }
