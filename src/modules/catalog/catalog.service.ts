import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Like } from "typeorm";
import { Products } from "../entities/Products";
import { Categories } from "../entities/Categories";
import { Uom } from "../entities/Uom";
import { LoggerService } from "../logger/logger.service";

@Injectable()
export class CatalogService {
  constructor(
    @InjectRepository(Products) private productRepo: Repository<Products>,
    @InjectRepository(Categories) private categoryRepo: Repository<Categories>,
    @InjectRepository(Uom) private uomRepo: Repository<Uom>,
    private logger: LoggerService
  ) {}

  // --- Products CRUD ---
  async createProduct(data: Partial<Products>) {
    const product = this.productRepo.create(data);
    return await this.productRepo.save(product);
  }

  async getProducts(page: number = 1, limit: number = 10, search: string = "", categoryId?: number) {
    const whereCondition: any = {};
    if (search) whereCondition.productName = Like(`%${search}%`);
    if (categoryId) whereCondition.categoryId = categoryId;

    const [data, total] = await this.productRepo.findAndCount({
      where: whereCondition,
      relations: ["category", "uom"],
      skip: (page - 1) * limit,
      take: limit,
      order: { id: "DESC" },
    });
    return { data, total, page, limit };
  }

  async getProductById(id: number) {
    return await this.productRepo.findOne({ where: { id }, relations: ["category", "uom", "recipes"] });
  }

  async updateProduct(id: number, data: Partial<Products>) {
    await this.productRepo.update(id, data);
    return { message: "Product updated successfully" };
  }

  async deleteProduct(id: number) {
    await this.productRepo.delete(id);
    return { message: "Product deleted successfully" };
  }

  // --- Categories CRUD ---
  async createCategory(data: Partial<Categories>) {
    const category = this.categoryRepo.create(data);
    return await this.categoryRepo.save(category);
  }

  async getCategories() {
    return await this.categoryRepo.find({ order: { categoryName: "ASC" } });
  }

  async updateCategory(id: number, data: Partial<Categories>) {
    await this.categoryRepo.update(id, data);
    return { message: "Category updated successfully" };
  }

  async deleteCategory(id: number) {
    await this.categoryRepo.delete(id);
    return { message: "Category deleted successfully" };
  }

  // --- UOM CRUD ---
  async createUom(data: Partial<Uom>) {
    const uom = this.uomRepo.create(data);
    return await this.uomRepo.save(uom);
  }

  async getUoms() {
    return await this.uomRepo.find();
  }

  async deleteUom(id: number) {
    await this.uomRepo.delete(id);
    return { message: "UOM deleted successfully" };
  }
}
