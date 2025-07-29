import conexao from "../models/conexao.js";
import bcrypt from "bcrypt";

export default async function createAccount(req, res) {
  const body = req.body;
  const nome = body.Nome;
  const email = body["E-mail"];
  const senha = body.Senha;
  const confime = body["Confirme a senha"];

  if (!nome) {
    return res.status(422).json({ mensagem: "O nome e obrigatorio" });
  }
  if (!email) {
    return res.status(422).json({ mensagem: "O e-mail e obrigatorio" });
  }
  if (!senha) {
    return res.status(422).json({ mensagem: "A senha e obrigatorio" });
  }
  if (senha !== confime) {
    return res.status(422).json({ mensagem: "As senhas estão diferentes" });
  }

  const [rows] = await conexao.execute(
    "SELECT email from users WHERE email = ?",
    [email]
  );

  if (rows.length > 0) {
    return res.status(422).json({ mensagem: "Esse email ja esta cadastrado" });
  }

  const salt = await bcrypt.genSalt(12);
  const senhaHash = await bcrypt.hash(senha, salt);

  await conexao.execute("INSERT INTO users (nome,email,senha) VALUES(?,?,?)", [
    nome,
    email,
    senhaHash,
  ]);
  res.status(201).json({ sucesso: "usuário cadastrado com sucesso!" });
}
