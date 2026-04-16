import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BusinessBranch } from "../entities/BusinessBranch";
import { BusinessBranchService } from "./branch.service";
import { BusinessBranchController } from "./branch.controller";
import { LoggerModule } from "../logger/logger.module";

@Module({
  imports: [TypeOrmModule.forFeature([BusinessBranch]), LoggerModule],
  providers: [BusinessBranchService],
  controllers: [BusinessBranchController],
})
export class BusinessBranchModule {}
