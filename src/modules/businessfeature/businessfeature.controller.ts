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
import { BusinessFeaturesService } from "./businessfeature.service";

@Controller("business-features")
export class BusinessFeaturesController {
  constructor(private readonly bfService: BusinessFeaturesService) {}

  // ✅ CREATE
  @Post()
  create(@Body() body: any) {
    return this.bfService.create(body);
  }

  // ✅ GET ALL
  @Get()
  getAll(
    @Query("page") page: number,
    @Query("limit") limit: number,
    @Query("businessId") businessId: number,
    @Query("featureId") featureId: number,
    @Query("isEnabled") isEnabled: boolean
  ) {
    return this.bfService.getAll(page, limit, businessId, featureId, isEnabled);
  }

  // ✅ GET BY ID
  @Get(":id")
  getById(@Param("id") id: number) {
    return this.bfService.getById(id);
  }

  // ✅ UPDATE
  @Put(":id")
  update(@Param("id") id: number, @Body() body: any) {
    return this.bfService.update(id, body);
  }

  // ✅ DELETE
  @Delete(":id")
  delete(@Param("id") id: number) {
    return this.bfService.delete(id);
  }
}
