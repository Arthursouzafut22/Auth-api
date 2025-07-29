import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Router } from "./routes/routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(Router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Servidor rodando!"));
