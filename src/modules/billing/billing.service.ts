import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Invoices } from "../entities/Invoices";
import { Invoiceitems } from "../entities/Invoiceitems";
import { Orderpayments } from "../entities/Orderpayments";
import { Paymentmethods } from "../entities/Paymentmethods";
import { Paymentstatuses } from "../entities/Paymentstatuses";
import { Paymenttype } from "../entities/Paymenttype";
import { LoggerService } from "../logger/logger.service";

@Injectable()
export class BillingService {
  constructor(
    @InjectRepository(Invoices) private invoiceRepo: Repository<Invoices>,
    @InjectRepository(Invoiceitems) private invoiceItemRepo: Repository<Invoiceitems>,
    @InjectRepository(Orderpayments) private paymentRepo: Repository<Orderpayments>,
    @InjectRepository(Paymentmethods) private methodRepo: Repository<Paymentmethods>,
    @InjectRepository(Paymentstatuses) private statusRepo: Repository<Paymentstatuses>,
    @InjectRepository(Paymenttype) private typeRepo: Repository<Paymenttype>,
    private logger: LoggerService
  ) { }

  // --- Invoices ---
  async createInvoice(data: any) {
    const { items, ...invoiceData } = data;
    const invoice = this.invoiceRepo.create(invoiceData);
    const savedInvoice = await this.invoiceRepo.save(invoice) as unknown as Invoices;

    if (items && items.length > 0) {
      const invoiceItems = items.map(item => ({
        ...item,
        invoiceId: savedInvoice.id
      }));
      await this.invoiceItemRepo.save(invoiceItems);
    }

    return this.getInvoiceById(savedInvoice.id);
  }

  async getInvoices(page: number = 1, limit: number = 10) {
    const [data, total] = await this.invoiceRepo.findAndCount({
      relations: ["invoiceitems", "order"],
      skip: (page - 1) * limit,
      take: limit,
      order: { id: "DESC" },
    });
    return { data, total, page, limit };
  }

  async getInvoiceById(id: number) {
    return await this.invoiceRepo.findOne({
      where: { id },
      relations: ["invoiceitems", "order"]
    });
  }

  // --- Payments ---
  async processPayment(data: Partial<Orderpayments>) {
    const payment = this.paymentRepo.create(data);
    return await this.paymentRepo.save(payment);
  }

  async getPayments(orderId?: number) {
    return await this.paymentRepo.find({
      where: orderId ? { orderId } : {},
      relations: ["paymentMethod", "paymentStatus", "paymentType"],
      order: { id: "DESC" }
    });
  }

  // --- Lookups ---
  async getPaymentMethods() {
    return await this.methodRepo.find();
  }

  async getPaymentStatuses() {
    return await this.statusRepo.find();
  }

  async getPaymentTypes() {
    return await this.typeRepo.find();
  }
}
