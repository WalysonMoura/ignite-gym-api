import { Prisma } from "prisma/generated/client";
import {
  FindByEmailParams,
  FindByIdParams,
  UsersRepository,
} from "../users-repository";
import prisma from "@/lib/prisma";

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  async findByEmail({ email }: FindByEmailParams) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findById({ userId }: FindByIdParams) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  }
  async update(data: Prisma.UserUpdateInput) {
    const user = await prisma.user.update({
      where: {
        id: data.id as string,
      },
      data,
    });

    return user;
  }
}
