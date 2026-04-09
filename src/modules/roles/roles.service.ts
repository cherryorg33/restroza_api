import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { Roles } from "../entities/Roles";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectDataSource } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LoggerService } from "../logger/logger.service";
@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private rolesrepo: Repository<Roles>,
    @InjectDataSource()
    private datasource: DataSource,
    private logger: LoggerService
  ) {}

  // ✅ CREATE ROLE
  async createRole(data: Roles): Promise<any> {
    try {
      const { roleName, roleDescription } = data;

      const count = await this.datasource.query(
        `SELECT COUNT(*) as count FROM roles WHERE roleName = ?`,
        [roleName]
      );

      if (count[0].count > 0) {
        throw new Error("Role already exists");
      }

      const result = await this.datasource.query(
        `INSERT INTO roles (roleName, roleDescription) VALUES (?, ?)`,
        [roleName, roleDescription]
      );

      return {
        message: "Role created successfully",
        insertId: result.insertId,
      };
    } catch (error) {
      throw error;
    }
  }

  // ✅ GET ALL ROLES (WITH PAGINATION + SEARCH)
  async getRoles(page: number = 1, limit: number = 10, search: string = "") {
    try {
      this.logger.log(`fetching the all roles`);

      const offset = (page - 1) * limit;

      let whereClause = "";
      let params: any[] = [];

      if (search) {
        whereClause = `WHERE roleName LIKE ?`;
        params.push(`%${search}%`);
      }

      // Total count
      const total = await this.datasource.query(
        `SELECT COUNT(*) as total FROM roles ${whereClause}`,
        params
      );

      // Data
      const data = await this.datasource.query(
        `SELECT * FROM roles ${whereClause} ORDER BY id DESC LIMIT ? OFFSET ?`,
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

  // ✅ GET SINGLE ROLE BY ID
  async getRoleById(id: number) {
    try {
      const result = await this.datasource.query(
        `SELECT * FROM roles WHERE id = ?`,
        [id]
      );

      if (result.length === 0) {
        throw new Error("Role not found");
      }

      return result[0];
    } catch (error) {
      throw error;
    }
  }

  // ✅ UPDATE ROLE
  async updateRole(id: number, data: Roles) {
    try {
      const { roleName, roleDescription } = data;

      const existing = await this.datasource.query(
        `SELECT * FROM roles WHERE id = ?`,
        [id]
      );

      if (existing.length === 0) {
        throw new Error("Role not found");
      }

      await this.datasource.query(
        `UPDATE roles 
         SET roleName = ?, roleDescription = ?
         WHERE id = ?`,
        [roleName, roleDescription, id]
      );

      return {
        message: "Role updated successfully",
      };
    } catch (error) {
      throw error;
    }
  }

  // ✅ DELETE ROLE
  async deleteRole(id: number) {
    try {
      const existing = await this.datasource.query(
        `SELECT * FROM roles WHERE id = ?`,
        [id]
      );

      if (existing.length === 0) {
        throw new Error("Role not found");
      }

      await this.datasource.query(`DELETE FROM roles WHERE id = ?`, [id]);

      return {
        message: "Role deleted successfully",
      };
    } catch (error) {
      throw error;
    }
  }
}
