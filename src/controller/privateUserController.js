import conexao from "../models/conexao.js";

export default async function privateUser(req, res) {
  const id = req.params.id;

  const [rows] = await conexao.execute(
    "SELECT id, nome, email, email FROM users WHERE id = ?",
    [id]
  );

  if (rows.length === 0) {
    res.status(404).json({ mensagem: "usuário não encontrado!" });
  }

  return res.status(200).json({ rows });
}
