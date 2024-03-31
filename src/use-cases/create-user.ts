import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { hash } from "bcryptjs";
import { UserAlreadyExists } from "./errors/user-already-exists";

interface CreateUseUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface CreateUseUseCaseResponse {
  user: User;
}

export class CreateUseUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    name,
    password,
  }: CreateUseUseCaseRequest): Promise<CreateUseUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail({ email });

    if (userWithSameEmail) {
      throw new UserAlreadyExists();
    }

    const password_hash = await hash(password, 6);

    const user = await this.usersRepository.create({
      email,
      name,
      password_hash,
    });

    return {
      user,
    };
  }
}
