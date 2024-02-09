import { Router } from "express";
import { CategoryServices } from "../services/category.services";

export const categoryRouter = Router();
const categories = new CategoryServices();


categoryRouter.post("/:id", categories.create);
categoryRouter.delete("/:id", categories.delete);