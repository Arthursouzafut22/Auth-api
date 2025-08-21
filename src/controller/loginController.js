import jwt from "jsonwebtoken";
import { Login } from "../models/loginModel.js";

const loginModel = new Login();

export default async function login(req, res) {
  const email = req.body["E-mail"];
  const senha = req.body["Senha"];

  try {
    // 1 - Buscar usuário pelo e-mail
    const user = await loginModel.findByEmail(email);

    if (!user) {
      return res.status(422).json({ mensagem: "E-mail não encontrado!" });
    }

    // 2 - Validar senha
    const senhaValida = await loginModel.checkSenha(senha, user.senha);

    if (!senhaValida) {
      return res.status(401).json({ mensagem: "Senha inválida!" });
    }

    // Gerar token;
    const SECRET = process.env.SECRET;
    const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: "1h" });
    return res.status(200).json({
      id: user.id,
      email: user.email,
      token,
      sucesso: "Login realizado com sucesso!",
    });
  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ mensagem: "Erro ao fazer login", error });
  }
}
