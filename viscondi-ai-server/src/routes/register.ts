import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../lib/prisma";
import bcrypt from 'bcrypt';

export async function createUser(app: FastifyInstance) {
    app.post('/register', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const { name, email, password } = request.body as { name: string, email: string, password: string };

            // Verifique se o email já está em uso
            const existingUser = await prisma.user.findUnique({
                where: {
                    email,
                },
            });

            if (existingUser) {
                reply.code(400).send({ message: 'O email já está em uso' });
                return;
            }

            // Hash da senha
            const hashedPassword = await bcrypt.hash(password, 10);

            // Crie o usuário no banco de dados
            const newUser = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                },
            });

            reply.code(201).send({ message: 'Usuário cadastrado com sucesso' });
        } catch (error) {
            console.error(error);
            reply.code(500).send({ message: 'Erro no servidor' });
        }
    });
}
