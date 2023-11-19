import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../lib/prisma";
import bcrypt from 'bcrypt';

interface EditUserRequestParams {
    userId: string;
}

export async function editUser(app: FastifyInstance) {
    app.put<{ Params: EditUserRequestParams }>('/edit-profile/:userId', async (request: FastifyRequest<{ Params: EditUserRequestParams }>, reply: FastifyReply) => {        try {
            const userId = request.params.userId;
            const { name, password } = request.body as { name?: string, password?: string };

            // Verificar se o usuário existe
            const existingUser = await prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });

            if (!existingUser) {
                reply.code(404).send({ message: 'Usuário não encontrado' });
                return;
            }

            // Atualizar o nome e/ou a senha, se fornecidos
            const updatedUserData: { name?: string, password?: string } = {};

            if (name) {
                updatedUserData.name = name;
            }

            if (password) {
                // Hash da nova senha
                const hashedPassword = await bcrypt.hash(password, 10);
                updatedUserData.password = hashedPassword;
            }

            const updatedUser = await prisma.user.update({
                where: {
                    id: userId,
                },
                data: updatedUserData,
            });

            reply.code(200).send({ message: 'Usuário atualizado com sucesso', user: updatedUser });
        } catch (error) {
            console.error(error);
            reply.code(500).send({ message: 'Erro no servidor' });
        }
    });
}
