import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from "@nestjs/common";
import { RolesService } from "./roles.service";
import { Roles } from "../entities/Roles";

@Controller("roles")
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  // ✅ CREATE ROLE
  @Post()
  async createRole(@Body() body: Roles) {
    return await this.rolesService.createRole(body);
  }

  // ✅ GET ALL (Pagination + Search)
  @Get()
  async getRoles(
    @Query("page") page: number,
    @Query("limit") limit: number,
    @Query("search") search: string
  ) {
    return await this.rolesService.getRoles(
      Number(page) || 1,
      Number(limit) || 10,
      search || ""
    );
  }

  // ✅ GET BY ID
  @Get(":id")
  async getRoleById(@Param("id") id: number) {
    return await this.rolesService.getRoleById(Number(id));
  }

  // ✅ UPDATE
  @Put(":id")
  async updateRole(@Param("id") id: number, @Body() body: Roles) {
    return await this.rolesService.updateRole(Number(id), body);
  }

  // ✅ DELETE
  @Delete(":id")
  async deleteRole(@Param("id") id: number) {
    return await this.rolesService.deleteRole(Number(id));
  }
}
