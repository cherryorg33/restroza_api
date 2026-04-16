import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Query,
  Body,
} from "@nestjs/common";
import { UserRolesService } from "./userrole.service";

@Controller("user-roles")
export class UserRolesController {
  constructor(private readonly userRolesService: UserRolesService) {}

  // ✅ CREATE
  @Post()
  create(@Body() body: any) {
    return this.userRolesService.create(body);
  }

  // ✅ GET ALL (with filters)
  @Get()
  getAll(
    @Query("page") page: number,
    @Query("limit") limit: number,
    @Query("userId") userId: number,
    @Query("branchId") branchId: number,
    @Query("roleId") roleId: number
  ) {
    return this.userRolesService.getAll(page, limit, userId, branchId, roleId);
  }

  // ✅ GET BY ID
  @Get(":id")
  getById(@Param("id") id: number) {
    return this.userRolesService.getById(id);
  }

  // ✅ UPDATE
  @Put(":id")
  update(@Param("id") id: number, @Body() body: any) {
    return this.userRolesService.update(id, body);
  }

  // ✅ DELETE
  @Delete(":id")
  delete(@Param("id") id: number) {
    return this.userRolesService.delete(id);
  }
}
