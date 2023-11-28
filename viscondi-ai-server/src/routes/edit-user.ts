import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface EditUserRequestParams {
  userId: string;
}

export async function editUser(app: FastifyInstance) {
  app.put<{ Params: EditUserRequestParams }>(
    "/edit-profile/:userId",
    async (
      request: FastifyRequest<{ Params: EditUserRequestParams }>,
      reply: FastifyReply
    ) => {
      try {
        const { token, name, password } = request.body as {
          token?: string;
          name?: string;
          password?: string;
        };

        if (!token) {
          reply
            .code(401)
            .send({ message: "Token de autenticação não fornecido" });
          return;
        }

        let userId: string;

        try {
          const decodedToken = jwt.verify(token, "secreto") as {
            userId: string;
          };
          userId = decodedToken.userId;
        } catch (error) {
          reply.code(401).send({ message: "Token de autenticação inválido" });
          return;
        }

        const existingUser = await prisma.user.findUnique({
          where: {
            id: userId,
          },
        });

        if (!existingUser) {
          reply.code(404).send({ message: "Usuário não encontrado" });
          return;
        }

        // Atualizar o nome e/ou a senha, se fornecidos
        const updatedUserData: { name?: string; password?: string } = {};

        if (name) {
          updatedUserData.name = name;
        }

        if (password) {
          // Hash da nova senha
          const hashedPassword = await bcrypt.hash(password, 10);
          updatedUserData.password = hashedPassword;
        }

        // Atualizar o usuário no banco de dados
        const updatedUser = await prisma.user.update({
          where: {
            id: userId,
          },
          data: updatedUserData,
        });

        reply.code(200).send({
          message: "Usuário atualizado com sucesso",
          user: updatedUser,
        });
      } catch (error) {
        console.error(error);
        reply.code(500).send({ message: "Erro no servidor" });
      }
    }
  );
}
