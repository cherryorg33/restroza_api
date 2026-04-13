import { Module } from "@nestjs/common";
import { BusinessService } from "./business.service";
import { BusinessController } from "./business.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Business } from "../entities/Business";
import { LoggerModule } from "../logger/logger.module";

@Module({
  imports: [TypeOrmModule.forFeature([Business]), LoggerModule],
  controllers: [BusinessController],
  providers: [BusinessService],
})
export class BusinessModule {}
