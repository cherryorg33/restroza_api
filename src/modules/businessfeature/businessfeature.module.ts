import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Businessfeatures as BusinessFeatures } from "../entities/Businessfeatures";
import { BusinessFeaturesService } from "./businessfeature.service";
import { BusinessFeaturesController } from "./businessfeature.controller";
import { LoggerModule } from "../logger/logger.module";

@Module({
  imports: [TypeOrmModule.forFeature([BusinessFeatures]), LoggerModule],
  providers: [BusinessFeaturesService],
  controllers: [BusinessFeaturesController],
})
export class BusinessFeaturesModule {}
