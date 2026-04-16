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
import { FeaturesService } from "./feature.service";

@Controller("features")
export class FeaturesController {
  constructor(private readonly featureService: FeaturesService) {}

  // ✅ CREATE
  @Post()
  create(@Body() body: any) {
    return this.featureService.create(body);
  }

  // ✅ GET ALL
  @Get()
  getAll(
    @Query("page") page: number,
    @Query("limit") limit: number,
    @Query("search") search: string
  ) {
    return this.featureService.getAll(page, limit, search);
  }

  // ✅ GET BY ID
  @Get(":id")
  getById(@Param("id") id: number) {
    return this.featureService.getById(id);
  }

  // ✅ UPDATE
  @Put(":id")
  update(@Param("id") id: number, @Body() body: any) {
    return this.featureService.update(id, body);
  }

  // ✅ DELETE
  @Delete(":id")
  delete(@Param("id") id: number) {
    return this.featureService.delete(id);
  }
}
