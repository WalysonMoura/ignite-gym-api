import { Prisma } from "@prisma/client";
import prisma from "../../lib/prisma";
import {
  CreateRefreshTokenParams,
  DeleteRefreshTokenParams,
  FindByEmailParams,
  FindByIdParams,
  FindByTokenParams,
  UpdateUserPhotoParams,
  UsersRepository,
} from "../users-repository";

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

    return user;
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

  async updateUserPhoto({ userId, filename }: UpdateUserPhotoParams) {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        avatar: filename,
      },
    });
  }
  async createRefreshToken({
    expiresIn,
    refreshToken,
    userId,
  }: CreateRefreshTokenParams) {
    const RefreshToken = await prisma.refreshToken.create({
      data: {
        user_id: userId,
        refresh_token: refreshToken,
        expires_in: expiresIn,
      },
    });

    return RefreshToken;
  }

  async findByRefreshToken({ refreshToken }: FindByTokenParams) {
    const RefreshToken = await prisma.refreshToken.findFirst({
      where: {
        refresh_token: refreshToken,
      },
      select: {
        user_id: true,
        expires_in: true,
      },
    });

    if (RefreshToken) {
      const { user_id, expires_in } = RefreshToken;
      if (expires_in !== null && user_id) {
        return {
          userId: user_id,
          expiresIn: expires_in,
        };
      }
    }
    return null;
  }

  async deleteRefreshToken({ userId }: DeleteRefreshTokenParams) {
    await prisma.refreshToken.deleteMany({
      where: {
        id: userId,
      },
    });
  }
}
