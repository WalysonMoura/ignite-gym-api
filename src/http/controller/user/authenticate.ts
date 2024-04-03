import { env } from "@/env";
import { randomUUID } from "crypto";
import { FastifyRequest, FastifyReply } from "fastify";
import { sign, SignOptions } from "jsonwebtoken";
import { z } from "zod";

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
  } catch (error) {}
}

function generateToken(userId: number): string {
  const { ACCESS_TOKEN_EXPIRATION, JWT_SECRET } = env;
  const options: SignOptions = {
    subject: String(userId),
    expiresIn: ACCESS_TOKEN_EXPIRATION, // Especifica o tempo de expiração do token JWT
  };
  return sign({}, JWT_SECRET, options);
}
/* 
async function generateRefreshToken(
  refreshTokenRepository: RefreshTokenRepository,
  userId: number
): Promise<string> {
  await refreshTokenRepository.deleteRefreshToken(userId);

  const expires_in = dayjs().add(15, "m").unix();
  const refresh_token = randomUUID();

  await refreshTokenRepository.createRefreshToken(
    userId,
    refresh_token,
    expires_in
  );

  return refresh_token;
}
 */
