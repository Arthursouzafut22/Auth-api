import conexao from "./conexao.js";
import bcrypt from "bcrypt";

class UserRegistration {
  async findByEmail(email) {
    const [rows] = await conexao.execute(
      "SELECT email from users WHERE email = ?",
      [email]
    );

    return rows.length > 0;
  }

  async createUser(body) {
    const salt = await bcrypt.genSalt(12);
    const senhaHash = await bcrypt.hash(body.Senha, salt);

    await conexao.execute(
      "INSERT INTO users (nome,email,senha) VALUES(?,?,?)",
      [body.Nome, body["E-mail"], senhaHash]
    );
  }
}

export { UserRegistration };
