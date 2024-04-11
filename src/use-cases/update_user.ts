
import { User } from "@prisma/client";
import { UserNotFound } from "./errors/user-not-found";
import { compare, hash } from "bcryptjs";
import { OldPasswordNotConference } from "./errors/old-password-not-conference";
import { UsersRepository } from "../repositories/users-repository";

interface UpdateUserUseCaseRequest {
  userId: string;
  name?: string;
  email?: string;
  password?: string;
  oldPassword?: string;
}

interface UpdateUserUseCaseResponse {
  user: User;
}

export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({
    userId,
    name,
    email,
    oldPassword,
    password,
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const user = await this.usersRepository.findById({ userId });

    if (!user) {
      throw new UserNotFound();
    }

    if (password && oldPassword) {
      const checkOldPassaword = await compare(oldPassword, user.password_hash);

      if (!checkOldPassaword) {
        throw new OldPasswordNotConference();
      }

      user.password_hash = await hash(password, 6);
    }

    if (name) {
      user.name = name;
    }

    if (email) {
      user.email = email;
    }
    
    return {
      user,
    };
  }
}
