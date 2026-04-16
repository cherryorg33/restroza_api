import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BillingService } from "./billing.service";
import { BillingController } from "./billing.controller";
import { Invoices } from "../entities/Invoices";
import { Invoiceitems } from "../entities/Invoiceitems";
import { Orderpayments } from "../entities/Orderpayments";
import { Paymentmethods } from "../entities/Paymentmethods";
import { Paymentstatuses } from "../entities/Paymentstatuses";
import { Paymenttype } from "../entities/Paymenttype";
import { LoggerService } from "../logger/logger.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Invoices,
      Invoiceitems,
      Orderpayments,
      Paymentmethods,
      Paymentstatuses,
      Paymenttype,
    ]),
  ],
  controllers: [BillingController],
  providers: [BillingService, LoggerService],
  exports: [BillingService],
})
export class BillingModule { }
