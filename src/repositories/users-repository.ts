import { Prisma, User } from "prisma/generated/client";

export interface FindByIdParams {
  userId: string;
}

export interface FindByEmailParams {
  email: string;
}

export interface UsersRepository {
  create: (data: Prisma.UserCreateInput) => Promise<User>;
  findById: ({ userId }: FindByIdParams) => Promise<User | null>;
  findByEmail: ({ email }: FindByEmailParams) => Promise<User | null>;
}
