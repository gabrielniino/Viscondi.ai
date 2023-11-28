import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { fastifyMultipart } from "@fastify/multipart";
import path from "node:path";
import { randomUUID } from "node:crypto";
import fs from "node:fs";
import { pipeline } from "node:stream";
import { promisify } from "node:util";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";

const pump = promisify(pipeline);

export async function uploadVideoRoute(app: FastifyInstance) {
  app.register(fastifyMultipart, {
    limits: {
      fileSize: 1_048_576 * 25, // 25mb
    },
  });

  app.post("/videos", async (request, reply) => {
    const token = request.headers.authorization?.split(" ")[1];

    if (!token) {
      return reply
        .status(401)
        .send({ error: "Token de autenticação não fornecido" });
    }

    // Verificar e decodificar o token
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

 
    const data = await request.file();

    if (!data) {
      return reply.status(400).send({ error: "Missing file input." });
    }

    const extension = path.extname(data.filename);

    if (extension !== ".mp3") {
      return reply
        .status(400)
        .send({ error: "Invalid input type, please upload an MP3 file." });
    }

    const fileBaseName = path.basename(data.filename, extension);
    const fileUploadName = `${fileBaseName}-${randomUUID()}${extension}`;
    const uploadDestination = path.resolve(
      __dirname,
      "../../tmp",
      fileUploadName
    );

    await pump(data.file, fs.createWriteStream(uploadDestination));

    const video = await prisma.video.create({
      data: {
        name: data.filename,
        path: uploadDestination,
      },
    });

    const history = await prisma.history.create({
      data: {
        video_Id: video.id,
        user_Id: userId,
      },
    });

    return {
      video,
    };
  });
}
