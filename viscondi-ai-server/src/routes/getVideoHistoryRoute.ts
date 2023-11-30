import { FastifyInstance, RouteShorthandOptions } from "fastify";
import { prisma } from "../lib/prisma";
import jwt from "jsonwebtoken";

interface VideoHistoryRequest {
  video_id: string;
  user_id: string;
}

export async function getVideoHistoryRoute(app: FastifyInstance) {
  app.post<{ Body: VideoHistoryRequest }>(
    "/get-video-history",
    async (request, reply) => {
      const { user_id, video_id } = request.body;

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

      const videoHistory = await prisma.history.findMany({
        where: {
          user_Id: user_id,
          video_Id: video_id,
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
      return videoHistory;
    }
  );
}
