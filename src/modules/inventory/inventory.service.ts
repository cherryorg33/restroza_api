import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Stockledger } from "../entities/Stockledger";
import { Purchases } from "../entities/Purchases";
import { Purchaseitems } from "../entities/Purchaseitems";
import { LoggerService } from "../logger/logger.service";

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Stockledger) private stockRepo: Repository<Stockledger>,
    @InjectRepository(Purchases) private purchaseRepo: Repository<Purchases>,
    @InjectRepository(Purchaseitems) private purchaseItemRepo: Repository<Purchaseitems>,
    private logger: LoggerService
  ) { }

  // --- Purchases ---
  async createPurchase(data: any) {
    const { items, ...purchaseData } = data;
    const purchase = this.purchaseRepo.create(purchaseData);
    const savedPurchase = await this.purchaseRepo.save(purchase) as any;

    if (items && items.length > 0) {
      const purchaseItems = items.map(item => ({
        ...item,
        purchaseId: savedPurchase.id
      }));
      await this.purchaseItemRepo.save(purchaseItems);

      // --- Update Stock Ledger ---
      for (const item of purchaseItems) {
        await this.updateStock(item.productId, item.quantity, "PURCHASE", "PURCHASE", savedPurchase.id);
      }
    }

    return this.getPurchaseById(savedPurchase.id);
  }

  async getPurchases(page: number = 1, limit: number = 10) {
    const [data, total] = await this.purchaseRepo.findAndCount({
      relations: ["purchaseitems", "purchaseitems.product", "supplierUser"],
      skip: (page - 1) * limit,
      take: limit,
      order: { id: "DESC" }
    });
    return { data, total, page, limit };
  }

  async getPurchaseById(id: number) {
    return await this.purchaseRepo.findOne({
      where: { id },
      relations: ["purchaseitems", "purchaseitems.product", "supplierUser"]
    });
  }

  // --- Stock Ledger ---
  async updateStock(productId: number, quantity: string, type: "PURCHASE" | "SALE" | "ADJUSTMENT" | "RETURN", reference: string, referenceId: number) {
    const entry = this.stockRepo.create({
      productId,
      quantity,
      type,
      referenceType: reference,
      referenceId,
    });
    return await this.stockRepo.save(entry);
  }

  async getStockByProduct(productId: number) {
    const entries = await this.stockRepo.find({
      where: { productId },
      order: { createdAt: "DESC" }
    });

    let total = 0;
    entries.forEach(e => {
      if (e.type === "PURCHASE" || e.type === "ADJUSTMENT") total += parseFloat(e.quantity);
      else total -= parseFloat(e.quantity);
    });

    return { productId, currentStock: total, history: entries };
  }
}
