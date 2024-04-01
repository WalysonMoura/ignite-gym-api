import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { CreateUseUseCase } from "../create-user";

export function makeCreateUser() {
  const usersRepository = new PrismaUsersRepository();
  const createUserUseCase = new CreateUseUseCase(usersRepository);

  return createUserUseCase;
}
