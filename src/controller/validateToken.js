import jwt from "jsonwebtoken";

export default function validateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ mensagem: "Acesso negado!" });
  }

  try {
    const secret = process.env.SECRET;
    jwt.verify(token, secret);
    next();
  } catch (erro) {
    res.status(400).json({ mensagem: "Token inválido" });
  }
}
