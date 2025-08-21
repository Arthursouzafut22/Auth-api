import conexao from "./conexao.js";
import bcrypt from "bcrypt";

class Login {
  async findByEmail(email) {
    const [rows] = await conexao.execute(
      "SELECT id, email, senha FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  }

  async checkSenha(senhaDigitada, senhaBancoCrypto) {
    return await bcrypt.compare(senhaDigitada, senhaBancoCrypto);
  }
}

export { Login };
