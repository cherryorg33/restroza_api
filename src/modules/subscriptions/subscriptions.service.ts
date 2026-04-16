import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Plans } from "../entities/Plans";
import { Planfeatures } from "../entities/Planfeatures";
import { Subscriptionpayments } from "../entities/Subscriptionpayments";
import { LoggerService } from "../logger/logger.service";

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Plans) private planRepo: Repository<Plans>,
    @InjectRepository(Planfeatures) private featureRepo: Repository<Planfeatures>,
    @InjectRepository(Subscriptionpayments) private paymentRepo: Repository<Subscriptionpayments>,
    private logger: LoggerService
  ) {}

  // --- Plans ---
  async getPlans() {
    return await this.planRepo.find({ relations: ["planfeatures", "planfeatures.feature"] });
  }

  async getPlanById(id: number) {
    return await this.planRepo.findOne({ where: { id }, relations: ["planfeatures", "planfeatures.feature"] });
  }

  async createPlan(data: any) {
    const { features, ...planData } = data;
    const plan = this.planRepo.create(planData);
    const savedPlan = await this.planRepo.save(plan) as unknown as Plans;

    if (features && features.length > 0) {
      const planFeatures = features.map(f => ({ ...f, planId: savedPlan.id }));
      await this.featureRepo.save(planFeatures);
    }
    return this.getPlanById(savedPlan.id);
  }

  // --- Payments / Subscriptions ---
  async processSubscriptionPayment(data: Partial<Subscriptionpayments>) {
    const payment = this.paymentRepo.create(data);
    return await this.paymentRepo.save(payment);
  }

  async getSubscriptionHistory(businessId: number) {
    return await this.paymentRepo.find({
      where: { businessId },
      relations: ["plan"],
      order: { createdAt: "DESC" }
    });
  }
}
