import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HRService } from "./hr.service";
import { HRController } from "./hr.controller";
import { Attendance } from "../entities/Attendance";
import { Leaves } from "../entities/Leaves";
import { Employeedetails } from "../entities/Employeedetails";
import { BusinessOwner } from "../entities/BusinessOwner";
import { Payroll } from "../entities/Payroll";
import { Salarypayments } from "../entities/Salarypayments";
import { LoggerService } from "../logger/logger.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Attendance,
      Leaves,
      Employeedetails,
      BusinessOwner,
      Payroll,
      Salarypayments,
    ]),
  ],
  controllers: [HRController],
  providers: [HRService, LoggerService],
  exports: [HRService],
})
export class HRModule {}
