import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Like } from "typeorm";
import { BusinessBranch } from "../entities/BusinessBranch";
import { LoggerService } from "../logger/logger.service";

@Injectable()
export class BusinessBranchService {
  constructor(
    @InjectRepository(BusinessBranch)
    private branchRepo: Repository<BusinessBranch>,
    private logger: LoggerService
  ) {}

  // ✅ CREATE
  async createBranch(data: Partial<BusinessBranch>) {
    const existing = await this.branchRepo.findOne({
      where: { branchEmail: data.branchEmail },
    });

    if (existing) throw new Error("Branch email already exists");

    const branch = this.branchRepo.create(data);
    const result = await this.branchRepo.save(branch);

    return {
      message: "Branch created successfully",
      data: result,
    };
  }

  // ✅ GET ALL (Pagination + Search)
  async getBranches(page: number = 1, limit: number = 10, search: string = "") {
    this.logger.log("Fetching branches");

    const [data, total] = await this.branchRepo.findAndCount({
      where: search
        ? [
            { branchName: Like(`%${search}%`) },
            { branchEmail: Like(`%${search}%`) },
            { branchPhone: Like(`%${search}%`) },
          ]
        : {},
      order: { id: "DESC" },
      skip: (page - 1) * limit,
      take: limit,
    });

    return { total, page, limit, data };
  }

  // ✅ GET BY ID
  async getBranchById(id: number) {
    const branch = await this.branchRepo.findOne({ where: { id } });

    if (!branch) throw new Error("Branch not found");

    return branch;
  }

  // ✅ UPDATE
  async updateBranch(id: number, data: Partial<BusinessBranch>) {
    await this.getBranchById(id);

    await this.branchRepo.update(id, data);

    return { message: "Branch updated successfully" };
  }

  // ✅ DELETE
  async deleteBranch(id: number) {
    await this.getBranchById(id);

    await this.branchRepo.delete(id);

    return { message: "Branch deleted successfully" };
  }
}
