import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { UserNotFound } from "./errors/user-not-found";

interface UpdateUserUseCaseRequest {
  userId: string;
  name?: string;
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
    oldPassword,
    password,
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const user = await this.usersRepository.findById({ userId });

    if (!user) {
      throw new UserNotFound();
    }

    return {
      user,
    };
  }
}
