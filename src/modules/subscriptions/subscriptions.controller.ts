import { Controller, Get, Post, Body, Param, Query } from "@nestjs/common";
import { SubscriptionsService } from "./subscriptions.service";
import { Subscriptionpayments } from "../entities/Subscriptionpayments";

@Controller("subscriptions")
export class SubscriptionsController {
  constructor(private readonly subService: SubscriptionsService) {}

  @Get("plans")
  getPlans() {
    return this.subService.getPlans();
  }

  @Post("plans")
  createPlan(@Body() data: any) {
    return this.subService.createPlan(data);
  }

  @Post("payments")
  processPayment(@Body() data: Partial<Subscriptionpayments>) {
    return this.subService.processSubscriptionPayment(data);
  }

  @Get("history/:businessId")
  getHistory(@Param("businessId") businessId: number) {
    return this.subService.getSubscriptionHistory(businessId);
  }
}
