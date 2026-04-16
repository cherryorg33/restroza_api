import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LoggerModule } from "./modules/logger/logger.module";
import { RolesModule } from "./modules/roles/roles.module";
import { DatabaseModule } from "./database/database.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { BusinessModule } from "./modules/business/business.module";
import { UsersModule } from "./modules/users/user.module";
import { BusinessBranchModule } from "./modules/businessbranch/branch.module";
import { UserRolesModule } from "./modules/userRole/userrole.module";
import { FeaturesModule } from "./modules/feature/feature.module";
import { BusinessFeaturesModule } from "./modules/businessfeature/businessfeature.module";
import { HRModule } from "./modules/hr/hr.module";
import { CatalogModule } from "./modules/catalog/catalog.module";
import { SalesModule } from "./modules/sales/sales.module";
import { BillingModule } from "./modules/billing/billing.module";
import { KitchenModule } from "./modules/kitchen/kitchen.module";
import { InventoryModule } from "./modules/inventory/inventory.module";
import { SubscriptionsModule } from "./modules/subscriptions/subscriptions.module";
import { OperationsModule } from "./modules/operations/operations.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),

    DatabaseModule,
    LoggerModule,
    RolesModule,
    BusinessModule,
    UsersModule,
    BusinessBranchModule,
    UserRolesModule,
    FeaturesModule,
    BusinessFeaturesModule,
    HRModule,
    CatalogModule,
    SalesModule,
    BillingModule,
    KitchenModule,
    InventoryModule,
    SubscriptionsModule,
    OperationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
