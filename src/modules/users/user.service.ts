import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DataSource } from "typeorm";
import { Users } from "../entities/Users";

@Injectable()
export class userService {
  constructor(
    @InjectRepository(Users)
    private UserRepo: Repository<Users>,
    private datasorce: DataSource
  ) {}

  async createUser(data: Partial<Users>) {
    try {
    } catch (error) {
      console.log(error);
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException("Create User Failed");
    }
  }

  async GetAllUsers() {
    try {
      const data = await this.datasorce.query(`select * from users`);
      return data;
    } catch (error) {
      console.log(error);
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException("Create User Failed");
    }
  }

  async GetdataById(id: number) {
    try {
      // const data = await this.UserRepo.findOneBy(id:id);
    } catch (error) {
      console.log(error);
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException("Create User Failed");
    }
  }
}
