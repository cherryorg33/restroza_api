import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Features } from "../entities/Features";
import { FeaturesService } from "./feature.service";
import { FeaturesController } from "./feature.controller";
import { LoggerModule } from "../logger/logger.module";

@Module({
  imports: [TypeOrmModule.forFeature([Features]), LoggerModule],
  providers: [FeaturesService],
  controllers: [FeaturesController],
})
export class FeaturesModule {}
