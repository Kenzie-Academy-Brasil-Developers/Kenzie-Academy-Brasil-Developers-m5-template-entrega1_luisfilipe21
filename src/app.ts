import "express-async-errors";
import "dotenv/config";
import helmet from "helmet";
import express, { Application, json } from "express";
import { taskRouter } from "./router/task.router";
import { categoryRouter } from "./router/category.router";
import { HandleErrorsMiddleware } from "./middlewares/handleErrors";

export const app: Application = express();
const handleErrors = new HandleErrorsMiddleware();

app.use(helmet());
app.use(json());

app.use("/categories", categoryRouter);
app.use("/tasks", taskRouter);

app.use(handleErrors.execute);