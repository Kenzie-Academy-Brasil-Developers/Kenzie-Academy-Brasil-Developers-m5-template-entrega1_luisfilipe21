import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
import { CheckMiddleware } from "../middlewares/check.middlewares";
import { createCategorySchema } from "../schemas/category.schema";
import { AuthMiddleware } from "../middlewares/auth.middlewares";

export const categoryRouter = Router();

const categories = new CategoryController();
const middleware = new CheckMiddleware();
const auth = new AuthMiddleware();

categoryRouter.use("/", auth.isAuthenticated);

categoryRouter.post("/", middleware.validateBody(createCategorySchema), categories.create);
categoryRouter.delete("/:id", middleware.categoryIdValid, categories.delete);