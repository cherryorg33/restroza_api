import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Query,
  Body,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { UsersService } from "./user.service";
import { Users } from "../entities/Users";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { multerOptions } from "../../upload/multer.config";
import type { Multer } from "multer";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ✅ CREATE
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: "userPhoto", maxCount: 1 },
        { name: "userAadhar", maxCount: 1 },
      ],
      multerOptions
    )
  )
  create(
    @UploadedFiles()
    files: {
      userPhoto?: any;
      userAadhar?: any;
    },
    @Body() body: Partial<Users>
  ) {
    // ✅ assign filenames to body
    if (files?.userPhoto) {
      body.userPhoto = files.userPhoto[0].filename;
    }

    if (files?.userAadhar) {
      body.userAadhar = files.userAadhar[0].filename;
    }

    return this.usersService.createUser(body);
  }

  // ✅ GET ALL (pagination + search + id filter)
  @Get()
  getUsers(
    @Query("page") page: number,
    @Query("limit") limit: number,
    @Query("search") search: string,
    @Query("id") id: number
  ) {
    return this.usersService.getUsers(page, limit, search, id);
  }

  // ✅ GET BY ID
  @Get(":id")
  getUser(@Param("id") id: number) {
    return this.usersService.getUserById(id);
  }

  // ✅ UPDATE
  @Put(":id")
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: "userPhoto", maxCount: 1 },
        { name: "userAadhar", maxCount: 1 },
      ],
      multerOptions
    )
  )
  async updateUser(
    @Param("id") id: number,
    @UploadedFiles()
    files: {
      userPhoto?: any;
      userAadhar?: any;
    },
    @Body() body: any
  ) {
    if (files?.userPhoto) {
      body.userPhoto = files.userPhoto[0].filename;
    }

    if (files?.userAadhar) {
      body.userAadhar = files.userAadhar[0].filename;
    }

    return this.usersService.updateUser(id, body);
  }

  // ✅ DELETE
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.usersService.deleteUser(id);
  }
}
