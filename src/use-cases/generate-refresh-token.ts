import { randomUUID } from "node:crypto";
import { UsersRepository } from "../repositories/users-repository";

interface GenerateRefreshTokenUseCaseRequest {
  userId: string;
}

interface GenerateRefreshTokenUseCaseResponse {
  refreshToken: string;
}

export class GenerateRefreshTokenUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    userId,
  }: GenerateRefreshTokenUseCaseRequest): Promise<GenerateRefreshTokenUseCaseResponse> {
    const expiresIn = Number(new Date(Date.now() + 15 * 60 * 1000));
    const refreshToken = randomUUID();

    await this.userRepository.createRefreshToken({
      expiresIn,
      refreshToken,
      userId,
    });

    return {
      refreshToken,
    };
  }
}
