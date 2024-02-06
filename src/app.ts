
import "express-async-errors"
import "dotenv/config"
import helmet from "helmet";
import express, { json } from "express";

export const app = express();

app.use(helmet())
app.use(json());