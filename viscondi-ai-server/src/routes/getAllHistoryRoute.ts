import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import jwt from "jsonwebtoken";

export async function getAllHistoryRoute(app: FastifyInstance) {
  app.get("/history", async (request, reply) => {
    const token = request.headers.authorization?.split(" ")[1];

    if (!token) {
      return reply
        .status(401)
        .send({ error: "Token de autenticação não fornecido" });
    }

    let userId: string;

    try {
      const decodedToken = jwt.verify(token, "secreto") as {
        userId: string;
      };
      userId = decodedToken.userId;
    } catch (error) {
      return reply
        .status(401)
        .send({ error: "Token de autenticação inválido" });
    }

    const userHistoryWithVideos = await prisma.history.findMany({
      where: {
        user_Id: userId,
      },
      select: {
        user_Id: true,
        video_Id: true,
        video: {
          select: {
            name: true,
            path: true,
            transcription: true,
          },
        },
      },
    });
    return userHistoryWithVideos;
  });
}
