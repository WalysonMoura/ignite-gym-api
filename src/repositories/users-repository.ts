import { Prisma, User } from "prisma/generated/client";

export interface FindByEmailParams {
  email: string;
}

export interface UsersRepository {
  create: (data: Prisma.UserCreateInput) => Promise<User>;
  findByEmail: ({ email }: FindByEmailParams) => Promise<User | null>;
}
