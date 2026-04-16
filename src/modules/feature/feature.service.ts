import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Like } from "typeorm";
import { Features } from "../entities/Features";
import { LoggerService } from "../logger/logger.service";

@Injectable()
export class FeaturesService {
  constructor(
    @InjectRepository(Features)
    private featureRepo: Repository<Features>,
    private logger: LoggerService
  ) {}

  // ✅ CREATE
  async create(data: Partial<Features>) {
    try {
      const { featureName, featureCode } = data;

      // 🔥 check duplicate name or code
      const existing = await this.featureRepo.findOne({
        where: [{ featureName }, { featureCode }],
      });

      if (existing) {
        throw new Error("Feature already exists");
      }

      const feature = this.featureRepo.create(data);
      const result = await this.featureRepo.save(feature);

      return {
        message: "Feature created successfully",
        data: result,
      };
    } catch (error) {
      throw error;
    }
  }

  // ✅ GET ALL (Pagination + Search)
  async getAll(page: number = 1, limit: number = 10, search: string = "") {
    try {
      this.logger.log("Fetching features");

      const [data, total] = await this.featureRepo.findAndCount({
        where: search
          ? [
              { featureName: Like(`%${search}%`) },
              { featureCode: Like(`%${search}%`) },
            ]
          : {},
        order: { id: "DESC" },
        skip: (page - 1) * limit,
        take: limit,
      });

      return {
        total,
        page,
        limit,
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  // ✅ GET BY ID
  async getById(id: number) {
    const feature = await this.featureRepo.findOne({
      where: { id },
    });

    if (!feature) throw new Error("Feature not found");

    return feature;
  }

  // ✅ UPDATE
  async update(id: number, data: Partial<Features>) {
    await this.getById(id);

    const { featureName, featureCode } = data;

    // 🔥 prevent duplicate update
    if (featureName || featureCode) {
      const existing = await this.featureRepo.findOne({
        where: [{ featureName }, { featureCode }],
      });

      if (existing && existing.id !== id) {
        throw new Error("Feature name/code already exists");
      }
    }

    await this.featureRepo.update(id, data);

    return {
      message: "Feature updated successfully",
    };
  }

  // ✅ DELETE
  async delete(id: number) {
    await this.getById(id);

    await this.featureRepo.delete(id);

    return {
      message: "Feature deleted successfully",
    };
  }
}
