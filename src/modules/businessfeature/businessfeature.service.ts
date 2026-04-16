import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Businessfeatures as BusinessFeatures } from "../entities/Businessfeatures";
import { LoggerService } from "../logger/logger.service";

@Injectable()
export class BusinessFeaturesService {
  constructor(
    @InjectRepository(BusinessFeatures)
    private bfRepo: Repository<BusinessFeatures>,
    private logger: LoggerService
  ) {}

  // ✅ CREATE
  async create(data: Partial<BusinessFeatures>) {
    try {
      const { businessId, featureId } = data;

      // 🔥 UNIQUE CHECK
      const existing = await this.bfRepo.findOne({
        where: { businessId, featureId },
      });

      if (existing) {
        throw new Error("Feature already assigned to this business");
      }

      const record = this.bfRepo.create(data);
      const result = await this.bfRepo.save(record);

      return {
        message: "Feature assigned to business successfully",
        data: result,
      };
    } catch (error) {
      throw error;
    }
  }

  // ✅ GET ALL (Pagination + Filters)
  async getAll(
    page: number = 1,
    limit: number = 10,
    businessId?: number,
    featureId?: number,
    isEnabled?: boolean
  ) {
    try {
      this.logger.log("Fetching business features");

      const where: any = {};

      if (businessId) where.businessId = businessId;
      if (featureId) where.featureId = featureId;
      if (isEnabled !== undefined) where.isEnabled = isEnabled;

      const [data, total] = await this.bfRepo.findAndCount({
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
    const data = await this.bfRepo.findOne({ where: { id } });

    if (!data) throw new Error("Business feature not found");

    return data;
  }

  // ✅ UPDATE
  async update(id: number, data: Partial<BusinessFeatures>) {
    await this.getById(id);

    await this.bfRepo.update(id, data);

    return {
      message: "Business feature updated successfully",
    };
  }

  // ✅ DELETE
  async delete(id: number) {
    await this.getById(id);

    await this.bfRepo.delete(id);

    return {
      message: "Business feature deleted successfully",
    };
  }
}
