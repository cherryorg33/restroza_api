import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { HRService } from "./hr.service";
import { Employeedetails } from "../entities/Employeedetails";
import { Attendance } from "../entities/Attendance";
import { Leaves } from "../entities/Leaves";
import { BusinessOwner } from "../entities/BusinessOwner";

@Controller("hr")
export class HRController {
  constructor(private readonly hrService: HRService) {}

  // --- Employees ---
  @Post("employees")
  createEmployee(@Body() data: Partial<Employeedetails>) {
    return this.hrService.createEmployee(data);
  }

  @Get("employees")
  getEmployees(
    @Query("page") page: number,
    @Query("limit") limit: number,
    @Query("search") search: string
  ) {
    return this.hrService.getEmployees(page, limit, search);
  }

  @Get("employees/:id")
  getEmployeeById(@Param("id") id: number) {
    return this.hrService.getEmployeeById(id);
  }

  @Patch("employees/:id")
  updateEmployee(@Param("id") id: number, @Body() data: Partial<Employeedetails>) {
    return this.hrService.updateEmployee(id, data);
  }

  @Delete("employees/:id")
  removeEmployee(@Param("id") id: number) {
    return this.hrService.deleteEmployee(id);
  }

  // --- Attendance ---
  @Post("attendance")
  markAttendance(@Body() data: Partial<Attendance>) {
    return this.hrService.markAttendance(data);
  }

  @Get("attendance/:employeeId")
  getAttendance(
    @Param("employeeId") employeeId: number,
    @Query("page") page: number,
    @Query("limit") limit: number
  ) {
    return this.hrService.getAttendance(employeeId, page, limit);
  }

  // --- Leaves ---
  @Post("leaves")
  applyLeave(@Body() data: Partial<Leaves>) {
    return this.hrService.applyLeave(data);
  }

  @Patch("leaves/:id/status")
  updateLeaveStatus(
    @Param("id") id: number,
    @Body("status") status: "PENDING" | "APPROVED" | "REJECTED"
  ) {
    return this.hrService.updateLeaveStatus(id, status);
  }

  // --- Payroll ---
  @Post("payroll/generate")
  generatePayroll(
    @Body("employeeId") employeeId: number,
    @Body("month") month: string
  ) {
    return this.hrService.generatePayroll(employeeId, month);
  }

  // --- Business Owners ---
  @Post("owners")
  createOwner(@Body() data: Partial<BusinessOwner>) {
    return this.hrService.createOwner(data);
  }

  @Get("owners")
  getOwners() {
    return this.hrService.getOwners();
  }
}
