import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";

export const categoryRouter = Router();

const categories = new CategoryController();


categoryRouter.post("/", categories.create);
categoryRouter.delete("/:id", categories.delete);