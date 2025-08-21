import { UserRegistration } from "../models/createModel.js";

const userModel = new UserRegistration();

export default async function createAccount(req, res) {
  const body = req.body;
  const nome = body.Nome;
  const email = body["E-mail"];
  const senha = body.Senha;
  const confime = body["Confirme a senha"];

  if (!nome) {
    return res.status(422).json({ mensagem: "O nome e obrigatório" });
  }
  if (!email) {
    return res.status(422).json({ mensagem: "O e-mail e obrigatório" });
  }
  if (!senha) {
    return res.status(422).json({ mensagem: "A senha e obrigatório" });
  }
  if (senha !== confime) {
    return res.status(422).json({ mensagem: "As senhas estão diferentes" });
  }

  try {
    const userExists = await userModel.findByEmail(email);

    if (userExists) {
      return res
        .status(422)
        .json({ mensagem: "Esse email já esta cadastrado." });
    }

    await userModel.createUser(body);
    return res.status(201).json({ sucesso: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Error ao cadastrar usuário" });
  }
}
