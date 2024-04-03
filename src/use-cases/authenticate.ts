import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { compare, hash } from "bcryptjs";
import { UserAlreadyExists } from "./errors/user-already-exists";
import { env } from "@/env";
import { sign } from "jsonwebtoken";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  user: User;
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail({
      email,
    });

    if (!user) {
      throw new Error("E-mail e/ou senha incorreta.");
    }

    const passwordMatched = await compare(password, user.password_hash);

    if (!passwordMatched) {
      throw new Error("E-mail e/ou senha incorreta.");
    }

    delete user.password_hash;

    return {
      user,
    };
  }
}

// jwtTokenProvider.ts
class JwtTokenProvider implements TokenProvider {
  generateToken(userId: number): Promise<string> {
    const { ACCESS_TOKEN_EXPIRATION, JWT_SECRET } = env;
    
    return new Promise((resolve, reject) => {
      sign(
        {},
        JWT_SECRET,
        {
          subject: String(userId),
          ACCESS_TOKEN_EXPIRATION,
        },
        (err, token) => {
          if (err) reject(err);
          resolve(token);
        }
      );
    });
  }
}
