import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SubscriptionsService } from "./subscriptions.service";
import { SubscriptionsController } from "./subscriptions.controller";
import { Plans } from "../entities/Plans";
import { Planfeatures } from "../entities/Planfeatures";
import { Subscriptionpayments } from "../entities/Subscriptionpayments";
import { LoggerService } from "../logger/logger.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Plans,
      Planfeatures,
      Subscriptionpayments,
    ]),
  ],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService, LoggerService],
  exports: [SubscriptionsService],
})
export class SubscriptionsModule {}
