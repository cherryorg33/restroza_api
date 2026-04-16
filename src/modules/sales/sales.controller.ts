import { Controller, Get, Post, Body, Patch, Param, Query } from "@nestjs/common";
import { SalesService } from "./sales.service";

@Controller("sales")
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post("orders")
  createOrder(@Body() data: any) {
    return this.salesService.createOrder(data);
  }

  @Get("orders")
  getOrders(
    @Query("page") page: number,
    @Query("limit") limit: number,
    @Query("businessId") businessId: number
  ) {
    return this.salesService.getOrders(page, limit, businessId);
  }

  @Get("orders/:id")
  getOrderById(@Param("id") id: number) {
    return this.salesService.getOrderById(id);
  }

  @Patch("orders/:id/status")
  updateStatus(@Param("id") id: number, @Body("statusId") statusId: number) {
    return this.salesService.updateOrderStatus(id, statusId);
  }

  @Get("statuses")
  getStatuses() {
    return this.salesService.getOrderStatuses();
  }

  @Get("types")
  getTypes() {
    return this.salesService.getOrderTypes();
  }
}
