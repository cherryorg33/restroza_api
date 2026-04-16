import { Controller, Get, Post, Body, Param, Query } from "@nestjs/common";
import { InventoryService } from "./inventory.service";

@Controller("inventory")
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post("purchases")
  createPurchase(@Body() data: any) {
    return this.inventoryService.createPurchase(data);
  }

  @Get("purchases")
  getPurchases(
    @Query("page") page: number,
    @Query("limit") limit: number
  ) {
    return this.inventoryService.getPurchases(page, limit);
  }

  @Get("purchases/:id")
  getPurchaseById(@Param("id") id: number) {
    return this.inventoryService.getPurchaseById(id);
  }

  @Get("stock/:productId")
  getItemStock(@Param("productId") productId: number) {
    return this.inventoryService.getStockByProduct(productId);
  }
}
