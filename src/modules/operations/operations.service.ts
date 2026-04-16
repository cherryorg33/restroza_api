import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Deliveries } from "../entities/Deliveries";
import { Authorization } from "../entities/Authorization";
import { LoggerService } from "../logger/logger.service";

@Injectable()
export class OperationsService {
  constructor(
    @InjectRepository(Deliveries) private deliveryRepo: Repository<Deliveries>,
    @InjectRepository(Authorization) private authRepo: Repository<Authorization>,
    private logger: LoggerService
  ) {}

  // --- Deliveries ---
  async createDelivery(data: Partial<Deliveries>) {
    const delivery = this.deliveryRepo.create(data);
    return await this.deliveryRepo.save(delivery);
  }

  async getDeliveries(status?: "ASSIGNED" | "PICKED" | "ON_THE_WAY" | "DELIVERED") {
    return await this.deliveryRepo.find({
      where: status ? { deliveryStatus: status } : {},
      relations: ["order", "deliveryUser"],
      order: { id: "DESC" }
    });
  }

  async updateDeliveryStatus(id: number, status: "ASSIGNED" | "PICKED" | "ON_THE_WAY" | "DELIVERED") {
    await this.deliveryRepo.update(id, { 
      deliveryStatus: status,
      deliveredAt: status === "DELIVERED" ? new Date() : undefined
    });
    return { message: `Delivery status updated to ${status}` };
  }

  // --- Authorization (Permissions) ---
  async getAuthorizations() {
    return await this.authRepo.find();
  }

  async setAuthorization(data: Partial<Authorization>) {
    const auth = this.authRepo.create(data);
    return await this.authRepo.save(auth);
  }
}
