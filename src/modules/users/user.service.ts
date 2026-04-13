import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Users } from '../entities/Users';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class userService {
  constructor(
    @InjectRepository(Users)
    private usersrepo: Repository<Users>,
    private datasource: DataSource,
    private logger: LoggerService,
  ) {}

  //create user
  async createUser(data: Users) {
    try {
      const { userName, userAadhar, userAddress, userEmail, userPassword } =
        data;

      const checkEmail = await this.usersrepo.findOne({ userEmail: userEmail });

      if (checkEmail) {
        throw new BadRequestException(`Users already Exict`);
      }

      const result = await this.datasource.query(
        `INSERT INTO users(userName,userAadhar , userAddress , userEmail , userPassword) and values (?,?,?,?,?)`,
        [userName, userAadhar, userAddress, userEmail, userPassword],
      );

      return {
        message: 'users created',
      };
    } catch (error) {
      this.logger.error(`${error}`);
    }
  }
}
