import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Like } from "typeorm";
import { Attendance } from "../entities/Attendance";
import { Leaves } from "../entities/Leaves";
import { Employeedetails } from "../entities/Employeedetails";
import { BusinessOwner } from "../entities/BusinessOwner";
import { Payroll } from "../entities/Payroll";
import { Salarypayments } from "../entities/Salarypayments";
import { LoggerService } from "../logger/logger.service";

@Injectable()
export class HRService {
  constructor(
    @InjectRepository(Attendance) private attendanceRepo: Repository<Attendance>,
    @InjectRepository(Leaves) private leavesRepo: Repository<Leaves>,
    @InjectRepository(Employeedetails) private employeeRepo: Repository<Employeedetails>,
    @InjectRepository(BusinessOwner) private ownerRepo: Repository<BusinessOwner>,
    @InjectRepository(Payroll) private payrollRepo: Repository<Payroll>,
    @InjectRepository(Salarypayments) private salaryPaymentRepo: Repository<Salarypayments>,
    private logger: LoggerService
  ) {}

  // --- Employee Details CRUD ---
  async createEmployee(data: Partial<Employeedetails>) {
    const employee = this.employeeRepo.create(data);
    return await this.employeeRepo.save(employee);
  }

  async getEmployees(page: number = 1, limit: number = 10, search: string = "") {
    const [data, total] = await this.employeeRepo.findAndCount({
      where: search ? { employeeCode: Like(`%${search}%`) } : {},
      relations: ["user"],
      skip: (page - 1) * limit,
      take: limit,
      order: { id: "DESC" },
    });
    return { data, total, page, limit };
  }

  async getEmployeeById(id: number) {
    return await this.employeeRepo.findOne({ where: { id }, relations: ["user", "attendances", "leaves"] });
  }

  async updateEmployee(id: number, data: Partial<Employeedetails>) {
    await this.employeeRepo.update(id, data);
    return { message: "Employee updated successfully" };
  }

  async deleteEmployee(id: number) {
    await this.employeeRepo.delete(id);
    return { message: "Employee deleted successfully" };
  }

  // --- Attendance CRUD ---
  async markAttendance(data: Partial<Attendance>) {
    const attendance = this.attendanceRepo.create(data);
    return await this.attendanceRepo.save(attendance);
  }

  async getAttendance(employeeId: number, page: number = 1, limit: number = 10) {
    const [data, total] = await this.attendanceRepo.findAndCount({
      where: { employeeId },
      skip: (page - 1) * limit,
      take: limit,
      order: { attendanceDate: "DESC" },
    });
    return { data, total, page, limit };
  }

  // --- Leaves CRUD ---
  async applyLeave(data: Partial<Leaves>) {
    const leave = this.leavesRepo.create(data);
    return await this.leavesRepo.save(leave);
  }

  async updateLeaveStatus(id: number, status: "PENDING" | "APPROVED" | "REJECTED") {
    await this.leavesRepo.update(id, { status });
    return { message: `Leave ${status.toLowerCase()} successfully` };
  }

  // --- Payroll Business Logic ---
  async generatePayroll(employeeId: number, month: string) {
    // Basic logic: Get all present days in the month
    const attendance = await this.attendanceRepo.find({
      where: { employeeId, status: "PRESENT" }, // simplified
    });

    const employee = await this.employeeRepo.findOne({ where: { id: employeeId } });
    if (!employee) throw new Error("Employee not found");

    const payroll = this.payrollRepo.create({
      employeeId,
      month,
      presentDays: attendance.length,
      basicSalary: employee.salary,
      netSalary: employee.salary, // simplified: should deduct for absences
      status: "PENDING",
    });

    return await this.payrollRepo.save(payroll);
  }

  // --- Business Owner CRUD ---
  async createOwner(data: Partial<BusinessOwner>) {
    const owner = this.ownerRepo.create(data);
    return await this.ownerRepo.save(owner);
  }

  async getOwners() {
    return await this.ownerRepo.find();
  }
}
