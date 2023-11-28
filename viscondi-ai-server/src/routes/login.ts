import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../lib/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function loginUser(app: FastifyInstance) {
  app.post("/login", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { email, password } = request.body as {
        email: string;
        password: string;
      };

      // Verifique se o usuário com o email fornecido existe no banco de dados
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        reply.status(401).send({ message: "Email inválido" });
        return;
      }

      // Verifique a senha do usuário
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        reply.status(401).send({ message: "Senha inválida" });
        return;
      }

      // Gere um token de autenticação (JWT)
      const token = jwt.sign({ userId: user.id }, "secreto", {
        expiresIn: "1h",
      });

      reply.status(200).send({ token });
    } catch (error) {
      console.error(error);
      reply.status(500).send({ message: "Erro no servidor" });
    }
  });
}
