import { Controller, Get, Post, Body, Patch, Param, Query } from "@nestjs/common";
import { KitchenService } from "./kitchen.service";

@Controller("kitchen")
export class KitchenController {
  constructor(private readonly kitchenService: KitchenService) {}

  // --- KOT ---
  @Post("kot")
  createKot(@Body() data: any) {
    return this.kitchenService.createKot(data);
  }

  @Get("kot")
  getKots(@Query("status") status: any) {
    return this.kitchenService.getKots(status);
  }

  @Get("kot/:id")
  getKotById(@Param("id") id: number) {
    return this.kitchenService.getKotById(id);
  }

  @Patch("kot/:id/status")
  updateStatus(
    @Param("id") id: number,
    @Body("status") status: "PENDING" | "PREPARING" | "READY" | "SERVED"
  ) {
    return this.kitchenService.updateKotStatus(id, status);
  }

  // --- Recipes ---
  @Post("recipes")
  createRecipe(@Body() data: any) {
    return this.kitchenService.createRecipe(data);
  }

  @Get("recipes")
  getRecipes(@Query("productId") productId: number) {
    return this.kitchenService.getRecipes(productId);
  }

  @Get("recipes/:id")
  getRecipeById(@Param("id") id: number) {
    return this.kitchenService.getRecipeById(id);
  }
}
