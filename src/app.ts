
import "express-async-errors"
import "dotenv/config"
import helmet from "helmet";
import express, { json } from "express";
import { taskRouter } from "./router/task.router";
import { categoryRouter } from "./router/category.router";

export const app = express();

app.use(helmet())
app.use(json());

app.use("/tasks", taskRouter)
app.use("/categories", categoryRouter)