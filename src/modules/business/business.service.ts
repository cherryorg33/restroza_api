import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";
import { LoggerService } from "../logger/logger.service";

@Injectable()
export class BusinessService {
  constructor(
    @InjectDataSource()
    private datasource: DataSource,
    private logger: LoggerService
  ) {}

  // ✅ CREATE BUSINESS
  async createBusiness(data: any) {
    try {
      const {
        businessName,
        businessAddress,
        email,
        password,
        businessType,
        phone,
        gstNumber,
        businessLogo,
      } = data;

      const existing = await this.datasource.query(
        `SELECT * FROM business WHERE email = ?`,
        [email]
      );

      if (existing.length > 0) {
        throw new Error("Business already exists with this email");
      }

      const result = await this.datasource.query(
        `INSERT INTO business 
        (businessName, businessAddress, email, password, businessType, phone, gstNumber, businessLogo) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          businessName,
          businessAddress,
          email,
          password,
          businessType,
          phone,
          gstNumber,
          businessLogo,
        ]
      );

      return {
        message: "Business created successfully",
        insertId: result.insertId,
      };
    } catch (error) {
      throw error;
    }
  }

  // ✅ GET ALL (SEARCH + PAGINATION)
  async getBusinesses(
    page: number = 1,
    limit: number = 10,
    search: string = ""
  ) {
    try {
      const offset = (page - 1) * limit;

      let whereClause = "";
      let params: any[] = [];

      if (search) {
        whereClause = `WHERE businessName LIKE ? OR email LIKE ?`;
        params.push(`%${search}%`, `%${search}%`);
      }

      const total = await this.datasource.query(
        `SELECT COUNT(*) as total FROM business ${whereClause}`,
        params
      );

      const data = await this.datasource.query(
        `SELECT * FROM business 
         ${whereClause} 
         ORDER BY id DESC 
         LIMIT ? OFFSET ?`,
        [...params, limit, offset]
      );

      return {
        total: total[0].total,
        page,
        limit,
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  // ✅ GET BY ID
  async getBusinessById(id: number) {
    try {
      const result = await this.datasource.query(
        `SELECT * FROM business WHERE id = ?`,
        [id]
      );

      if (result.length === 0) {
        throw new Error("Business not found");
      }

      return result[0];
    } catch (error) {
      throw error;
    }
  }

  // ✅ UPDATE BUSINESS
  async updateBusiness(id: number, data: any) {
    try {
      const existing = await this.datasource.query(
        `SELECT * FROM business WHERE id = ?`,
        [id]
      );

      if (existing.length === 0) {
        throw new Error("Business not found");
      }

      const {
        businessName,
        businessAddress,
        businessType,
        phone,
        gstNumber,
        businessLogo,
      } = data;

      await this.datasource.query(
        `UPDATE business 
         SET businessName = ?, 
             businessAddress = ?, 
             businessType = ?, 
             phone = ?, 
             gstNumber = ?, 
             businessLogo = ?
         WHERE id = ?`,
        [
          businessName,
          businessAddress,
          businessType,
          phone,
          gstNumber,
          businessLogo,
          id,
        ]
      );

      return {
        message: "Business updated successfully",
      };
    } catch (error) {
      throw error;
    }
  }

  // ✅ DELETE BUSINESS
  async deleteBusiness(id: number) {
    try {
      const existing = await this.datasource.query(
        `SELECT * FROM business WHERE id = ?`,
        [id]
      );

      if (existing.length === 0) {
        throw new Error("Business not found");
      }

      await this.datasource.query(`DELETE FROM business WHERE id = ?`, [id]);

      return {
        message: "Business deleted successfully",
      };
    } catch (error) {
      throw error;
    }
  }
}
