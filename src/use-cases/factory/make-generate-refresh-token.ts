import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { GenerateRefreshTokenUseCase } from "../generate-refresh-token";

export function makeGenerateRefreshTokenUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const generateRefreshTokenUseCase = new GenerateRefreshTokenUseCase(
    usersRepository
  );

  return generateRefreshTokenUseCase;
}
