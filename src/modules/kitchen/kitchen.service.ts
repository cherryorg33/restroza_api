import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Kot } from "../entities/Kot";
import { Kotitems } from "../entities/Kotitems";
import { Recipes } from "../entities/Recipes";
import { Recipeitems } from "../entities/Recipeitems";
import { LoggerService } from "../logger/logger.service";

@Injectable()
export class KitchenService {
  constructor(
    @InjectRepository(Kot) private kotRepo: Repository<Kot>,
    @InjectRepository(Kotitems) private kotItemRepo: Repository<Kotitems>,
    @InjectRepository(Recipes) private recipeRepo: Repository<Recipes>,
    @InjectRepository(Recipeitems) private recipeItemRepo: Repository<Recipeitems>,
    private logger: LoggerService
  ) {}

  // --- KOT (Kitchen Order Ticket) ---
  async createKot(data: any) {
    const { items, ...kotData } = data;
    const kot = this.kotRepo.create(kotData);
    const savedKot = await this.kotRepo.save(kot) as unknown as Kot;

    if (items && items.length > 0) {
      const kotItems = items.map(item => ({
        ...item,
        kotId: savedKot.id
      }));
      await this.kotItemRepo.save(kotItems);
    }

    return this.getKotById(savedKot.id);
  }

  async getKots(status?: "PENDING" | "PREPARING" | "READY" | "SERVED") {
    return await this.kotRepo.find({
      where: status ? { status } : {},
      relations: ["kotitems", "kotitems.product", "order"],
      order: { id: "DESC" }
    });
  }

  async getKotById(id: number) {
    return await this.kotRepo.findOne({
      where: { id },
      relations: ["kotitems", "kotitems.product", "order"]
    });
  }

  async updateKotStatus(id: number, status: "PENDING" | "PREPARING" | "READY" | "SERVED") {
    await this.kotRepo.update(id, { status });
    return { message: `KOT status updated to ${status}` };
  }

  // --- Recipes ---
  async createRecipe(data: any) {
    const { items, ...recipeData } = data;
    const recipe = this.recipeRepo.create(recipeData);
    const savedRecipe = await this.recipeRepo.save(recipe) as unknown as Recipes;

    if (items && items.length > 0) {
      const recipeItems = items.map(item => ({
        ...item,
        recipeId: savedRecipe.id
      }));
      await this.recipeItemRepo.save(recipeItems);
    }

    return this.getRecipeById(savedRecipe.id);
  }

  async getRecipes(productId?: number) {
    return await this.recipeRepo.find({
      where: productId ? { productId } : {},
      relations: ["recipeitems", "recipeitems.ingredient", "product"]
    });
  }

  async getRecipeById(id: number) {
    return await this.recipeRepo.findOne({
      where: { id },
      relations: ["recipeitems", "recipeitems.ingredient", "product"]
    });
  }
}
