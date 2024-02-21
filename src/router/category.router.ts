import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
import { CheckMiddleware } from "../middlewares/check.middlewares";
import { createCategorySchema } from "../schemas/category.schema";

export const categoryRouter = Router();

const categories = new CategoryController();
const middleware = new CheckMiddleware();


categoryRouter.post("/", middleware.validateBody(createCategorySchema), categories.create);
categoryRouter.delete("/:id", middleware.categoryIdValid, categories.delete);