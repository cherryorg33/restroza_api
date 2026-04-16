import { Controller, Get, Post, Body, Patch, Param, Query } from "@nestjs/common";
import { OperationsService } from "./operations.service";
import { Deliveries } from "../entities/Deliveries";
import { Authorization } from "../entities/Authorization";

@Controller("operations")
export class OperationsController {
  constructor(private readonly opsService: OperationsService) {}

  // --- Deliveries ---
  @Post("deliveries")
  createDelivery(@Body() data: Partial<Deliveries>) {
    return this.opsService.createDelivery(data);
  }

  @Get("deliveries")
  getDeliveries(@Query("status") status: any) {
    return this.opsService.getDeliveries(status);
  }

  @Patch("deliveries/:id/status")
  updateStatus(
    @Param("id") id: number,
    @Body("status") status: "ASSIGNED" | "PICKED" | "ON_THE_WAY" | "DELIVERED"
  ) {
    return this.opsService.updateDeliveryStatus(id, status);
  }

  // --- Authorization ---
  @Get("auth")
  getAuth() {
    return this.opsService.getAuthorizations();
  }

  @Post("auth")
  setAuth(@Body() data: Partial<Authorization>) {
    return this.opsService.setAuthorization(data);
  }
}
