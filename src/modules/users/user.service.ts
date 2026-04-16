import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Like } from "typeorm";
import { Users } from "../entities/Users";
import { LoggerService } from "../logger/logger.service";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepo: Repository<Users>,
    private logger: LoggerService
  ) {}

  // ✅ CREATE USER
  async createUser(data: Partial<Users>) {
    try {
      this.logger.log(`${JSON.stringify(data)}`);
      const existing = await this.usersRepo.findOne({
        where: { userEmail: data.userEmail },
      });

      if (existing) {
        throw new Error("User already exists");
      }

      const user = this.usersRepo.create(data);
      const result = await this.usersRepo.save(user);

      return {
        message: "User created successfully",
        data: result,
      };
    } catch (error) {
      throw error;
    }
  }

  // ✅ GET ALL USERS (Pagination + Search + ID Search 🔥)
  async getUsers(
    page: number = 1,
    limit: number = 10,
    search: string = "",
    id?: number
  ) {
    try {
      this.logger.log(`Fetching users`);

      const whereConditions: any[] = [];

      // 🔥 SEARCH (name/email/phone)
      if (search) {
        whereConditions.push(
          { userName: Like(`%${search}%`) },
          { userEmail: Like(`%${search}%`) },
          { userPhone: Like(`%${search}%`) }
        );
      }

      // 🔥 ID SEARCH
      if (id) {
        whereConditions.push({ id: id });
      }

      const [data, total] = await this.usersRepo.findAndCount({
        where: whereConditions.length > 0 ? whereConditions : {},
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

  // ✅ GET USER BY ID
  async getUserById(id: number) {
    try {
      const user = await this.usersRepo.findOne({
        where: { id },
      });

      if (!user) {
        throw new Error("User not found");
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id: number, data: Partial<Users>) {
    try {
      const existing = await this.getUserById(id);

      // ✅ DELETE OLD PHOTO
      if (data.userPhoto && existing.userPhoto) {
        const oldPhotoPath = path.join(
          process.cwd(),
          "uploads/users",
          existing.userPhoto
        );

        if (fs.existsSync(oldPhotoPath)) {
          fs.unlinkSync(oldPhotoPath);
        }
      }

      // ✅ DELETE OLD AADHAR
      if (data.userAadhar && existing.userAadhar) {
        const oldAadharPath = path.join(
          process.cwd(),
          "uploads/users",
          existing.userAadhar
        );

        if (fs.existsSync(oldAadharPath)) {
          fs.unlinkSync(oldAadharPath);
        }
      }

      // ✅ UPDATE DB
      await this.usersRepo.update(id, data);

      return {
        message: "User updated successfully",
      };
    } catch (error) {
      throw error;
    }
  }

  // ✅ DELETE USER
  async deleteUser(id: number) {
    try {
      const existing = await this.getUserById(id);

      await this.usersRepo.delete(id);

      return {
        message: "User deleted successfully",
      };
    } catch (error) {
      throw error;
    }
  }
}
