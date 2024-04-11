import { randomUUID } from "crypto";

import { FastifyRequest, FastifyReply } from "fastify";
import { sign, SignOptions } from "jsonwebtoken";
import { z } from "zod";
import { env } from "../../../env";
import { makeAuthenticateUseCase } from "../../../use-cases/factory/make-authenticate-use-case";
import { makeGenerateRefreshTokenUseCase } from "../../../use-cases/factory/make-generate-refresh-token";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateSchemaBody = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateSchemaBody.parse(request.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();
    const { user } = await authenticateUseCase.execute({ email, password });

    const generateRefreshTokenUseCase = makeGenerateRefreshTokenUseCase();
    const { refreshToken } = await generateRefreshTokenUseCase.execute({
      userId: user.id,
    });

    const { token } = generateToken(user.id);

    reply.status(201).send({
      token,
      refresh_token: refreshToken,
    });
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ message: error.message });
    }
    throw error;
  }
}

function generateToken(userId: string) {
  const { ACCESS_TOKEN_EXPIRATION, JWT_SECRET } = env;
  const options: SignOptions = {
    subject: String(userId),
    expiresIn: ACCESS_TOKEN_EXPIRATION, // Especifica o tempo de expiração do token JWT
  };
  const token = sign({}, JWT_SECRET, options);

  return { token };
}
