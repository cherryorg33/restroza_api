import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Userroles } from "../entities/Userroles";
import { LoggerService } from "../logger/logger.service";

@Injectable()
export class UserRolesService {
  constructor(
    @InjectRepository(Userroles)
    private userRolesRepo: Repository<Userroles>,
    private logger: LoggerService
  ) {}

  // ✅ CREATE
  async create(data: Partial<Userroles>) {
    try {
      const { userId, branchId, roleId } = data;

      // 🔥 UNIQUE CHECK (userId + branchId + roleId)
      //   const existing = await this.userRolesRepo.findOne({
      //     where: { userId, branchId, roleId },
      //   });

      //   if (existing) {
      //     throw new Error("User already assigned this role in this branch");
      //   }

      const record = this.userRolesRepo.create(data);
      const result = await this.userRolesRepo.save(record);

      return {
        message: "User role created successfully",
        data: result,
      };
    } catch (error) {
      throw error;
    }
  }

  // ✅ GET ALL (Pagination + optional filters)
  async getAll(
    page: number = 1,
    limit: number = 10,
    userId?: number,
    branchId?: number,
    roleId?: number
  ) {
    try {
      this.logger.log("Fetching user roles");

      const where: any = {};

      if (userId) where.userId = userId;
      if (branchId) where.branchId = branchId;
      if (roleId) where.roleId = roleId;

      const [data, total] = await this.userRolesRepo.findAndCount({
        where,
        order: { id: "DESC" },
        skip: (page - 1) * limit,
        take: limit,
      });

      return { total, page, limit, data };
    } catch (error) {
      throw error;
    }
  }

  // ✅ GET BY ID
  async getById(id: number) {
    const data = await this.userRolesRepo.findOne({ where: { id } });

    if (!data) throw new Error("User role not found");

    return data;
  }

  // ✅ UPDATE
  async update(id: number, data: Partial<Userroles>) {
    await this.getById(id);

    await this.userRolesRepo.update(id, data);

    return {
      message: "User role updated successfully",
    };
  }

  // ✅ DELETE
  async delete(id: number) {
    await this.getById(id);

    await this.userRolesRepo.delete(id);

    return {
      message: "User role deleted successfully",
    };
  }
}
