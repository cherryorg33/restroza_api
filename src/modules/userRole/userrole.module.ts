import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Userroles } from "../entities/Userroles";
import { UserRolesService } from "./userrole.service";
import { UserRolesController } from "./userrole.controller";
import { LoggerModule } from "../logger/logger.module";

@Module({
  imports: [TypeOrmModule.forFeature([Userroles]), LoggerModule],
  providers: [UserRolesService],
  controllers: [UserRolesController],
})
export class UserRolesModule {}
