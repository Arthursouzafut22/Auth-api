import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import conexao from "./models/conexao.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3005;

app.get("/", function (req, res) {
  res.json({ teste: "Olá" });
});

app.listen(PORT, () => console.log("Servidor rodando!!!"));
