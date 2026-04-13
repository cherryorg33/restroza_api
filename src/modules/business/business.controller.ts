import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Put,
  Delete,
} from "@nestjs/common";
import { BusinessService } from "./business.service";

@Controller("business")
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  // ✅ CREATE
  @Post()
  create(@Body() body: any) {
    return this.businessService.createBusiness(body);
  }

  // ✅ GET ALL (pagination + search)
  @Get()
  findAll(
    @Query("page") page: number,
    @Query("limit") limit: number,
    @Query("search") search: string
  ) {
    return this.businessService.getBusinesses(page, limit, search);
  }

  // ✅ GET BY ID
  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.businessService.getBusinessById(id);
  }

  // ✅ UPDATE
  @Put(":id")
  update(@Param("id") id: number, @Body() body: any) {
    return this.businessService.updateBusiness(id, body);
  }

  // ✅ DELETE
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.businessService.deleteBusiness(id);
  }
}
