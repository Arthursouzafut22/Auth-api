import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const conexao = await mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

conexao.connect((err) => {
  if (err) {
    console.error("Error em conectar com banco de dados!", err);
    return;
  } else {
    console.log("Conexão realizada com sucesso!");
  }
});

export default conexao;
