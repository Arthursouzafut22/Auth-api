import conexao from "../models/conexao.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default async function login(req, res) {
  const email = req.body["E-mail"];
  const senhaDigitada = req.body["Senha"];

  const [rows] = await conexao.execute(
    "SELECT id, email, senha FROM users WHERE email = ?",
    [email]
  );

  if (rows.length === 0) {
    res.status(422).json({ mensagem: "E-mail não encontrado!" });
  }

  const senhaBancoCrypto = rows[0].senha;
  const checkSenha = await bcrypt.compare(senhaDigitada, senhaBancoCrypto);

  if (!checkSenha) {
    return res.status(401).json({ mensagem: "Senha inválida!" });
  }

  try {
    const SECRET = process.env.SECRET;
    const token = jwt.sign({ id: rows[0].id }, SECRET);

    return res.status(200).json({
      id: rows[0].id,
      token,
      mensagem: "Login realizado com sucesso!",
    });
  } catch (erro) {
    return res.status(500).json({ mensagem: "Error ao fazer login", erro });
  }
}
