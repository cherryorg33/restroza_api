import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "../entities/Users";
import { UsersService } from "./user.service";
import { UsersController } from "./user.controller";
import { LoggerModule } from "../logger/logger.module";

@Module({
  imports: [TypeOrmModule.forFeature([Users]), LoggerModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
