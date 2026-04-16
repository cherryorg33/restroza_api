import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Orders } from "../entities/Orders";
import { Orderitems } from "../entities/Orderitems";
import { Orderstatuses } from "../entities/Orderstatuses";
import { Ordertypes } from "../entities/Ordertypes";
import { LoggerService } from "../logger/logger.service";

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Orders) private orderRepo: Repository<Orders>,
    @InjectRepository(Orderitems) private orderItemRepo: Repository<Orderitems>,
    @InjectRepository(Orderstatuses) private statusRepo: Repository<Orderstatuses>,
    @InjectRepository(Ordertypes) private typeRepo: Repository<Ordertypes>,
    private logger: LoggerService
  ) {}

  // --- Orders CRUD ---
  async createOrder(data: any) {
    const { items, ...orderData } = data;
    
    const order = this.orderRepo.create(orderData);
    const savedOrder = await this.orderRepo.save(order) as unknown as Orders;

    if (items && items.length > 0) {
      const orderItems = items.map(item => ({
        ...item,
        orderId: savedOrder.id
      }));
      await this.orderItemRepo.save(orderItems);
    }

    return this.getOrderById(savedOrder.id);
  }

  async getOrders(page: number = 1, limit: number = 10, businessId?: number) {
    const [data, total] = await this.orderRepo.findAndCount({
      where: businessId ? { businessId } : {},
      relations: ["orderitems", "orderStatus", "orderType"],
      skip: (page - 1) * limit,
      take: limit,
      order: { id: "DESC" },
    });
    return { data, total, page, limit };
  }

  async getOrderById(id: number) {
    return await this.orderRepo.findOne({ 
      where: { id }, 
      relations: ["orderitems", "orderStatus", "orderType", "orderitems.product"] 
    });
  }

  async updateOrderStatus(id: number, statusId: number) {
    await this.orderRepo.update(id, { orderStatusId: statusId });
    return { message: "Order status updated successfully" };
  }

  // --- Order Statuses ---
  async getOrderStatuses() {
    return await this.statusRepo.find();
  }

  // --- Order Types ---
  async getOrderTypes() {
    return await this.typeRepo.find();
  }
}
