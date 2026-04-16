import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { CatalogService } from "./catalog.service";
import { Products } from "../entities/Products";
import { Categories } from "../entities/Categories";
import { Uom } from "../entities/Uom";

@Controller("catalog")
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  // --- Products ---
  @Post("products")
  createProduct(@Body() data: Partial<Products>) {
    return this.catalogService.createProduct(data);
  }

  @Get("products")
  getProducts(
    @Query("page") page: number,
    @Query("limit") limit: number,
    @Query("search") search: string,
    @Query("categoryId") categoryId: number
  ) {
    return this.catalogService.getProducts(page, limit, search, categoryId);
  }

  @Get("products/:id")
  getProductById(@Param("id") id: number) {
    return this.catalogService.getProductById(id);
  }

  @Patch("products/:id")
  updateProduct(@Param("id") id: number, @Body() data: Partial<Products>) {
    return this.catalogService.updateProduct(id, data);
  }

  @Delete("products/:id")
  removeProduct(@Param("id") id: number) {
    return this.catalogService.deleteProduct(id);
  }

  // --- Categories ---
  @Post("categories")
  createCategory(@Body() data: Partial<Categories>) {
    return this.catalogService.createCategory(data);
  }

  @Get("categories")
  getCategories() {
    return this.catalogService.getCategories();
  }

  @Patch("categories/:id")
  updateCategory(@Param("id") id: number, @Body() data: Partial<Categories>) {
    return this.catalogService.updateCategory(id, data);
  }

  @Delete("categories/:id")
  removeCategory(@Param("id") id: number) {
    return this.catalogService.deleteCategory(id);
  }

  // --- UOM ---
  @Post("uom")
  createUom(@Body() data: Partial<Uom>) {
    return this.catalogService.createUom(data);
  }

  @Get("uom")
  getUoms() {
    return this.catalogService.getUoms();
  }

  @Delete("uom/:id")
  removeUom(@Param("id") id: number) {
    return this.catalogService.deleteUom(id);
  }
}
