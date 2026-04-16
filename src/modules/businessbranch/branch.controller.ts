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
import { BusinessBranchService } from "./branch.service";

@Controller("branch")
export class BusinessBranchController {
  constructor(private readonly branchService: BusinessBranchService) {}

  // ✅ CREATE
  @Post()
  create(@Body() body: any) {
    return this.branchService.createBranch(body);
  }

  // ✅ GET ALL
  @Get()
  getAll(
    @Query("page") page: number,
    @Query("limit") limit: number,
    @Query("search") search: string
  ) {
    return this.branchService.getBranches(page, limit, search);
  }

  // ✅ GET BY ID
  @Get(":id")
  getOne(@Param("id") id: number) {
    return this.branchService.getBranchById(id);
  }

  // ✅ UPDATE
  @Put(":id")
  update(@Param("id") id: number, @Body() body: any) {
    return this.branchService.updateBranch(id, body);
  }

  // ✅ DELETE
  @Delete(":id")
  delete(@Param("id") id: number) {
    return this.branchService.deleteBranch(id);
  }
}
