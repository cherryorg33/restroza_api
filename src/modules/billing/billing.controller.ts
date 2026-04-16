import { Controller, Get, Post, Body, Param, Query } from "@nestjs/common";
import { BillingService } from "./billing.service";
import { Orderpayments } from "../entities/Orderpayments";

@Controller("billing")
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  // --- Invoices ---
  @Post("invoices")
  createInvoice(@Body() data: any) {
    return this.billingService.createInvoice(data);
  }

  @Get("invoices")
  getInvoices(
    @Query("page") page: number,
    @Query("limit") limit: number
  ) {
    return this.billingService.getInvoices(page, limit);
  }

  @Get("invoices/:id")
  getInvoiceById(@Param("id") id: number) {
    return this.billingService.getInvoiceById(id);
  }

  // --- Payments ---
  @Post("payments")
  processPayment(@Body() data: Partial<Orderpayments>) {
    return this.billingService.processPayment(data);
  }

  @Get("payments")
  getPayments(@Query("orderId") orderId: number) {
    return this.billingService.getPayments(orderId);
  }

  // --- Lookups ---
  @Get("methods")
  getMethods() {
    return this.billingService.getPaymentMethods();
  }

  @Get("statuses")
  getStatuses() {
    return this.billingService.getPaymentStatuses();
  }

  @Get("types")
  getTypes() {
    return this.billingService.getPaymentTypes();
  }
}
