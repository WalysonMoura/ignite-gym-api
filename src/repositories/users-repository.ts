import { Prisma, RefreshToken, User } from "@prisma/client";


export interface FindByIdParams {
  userId: string;
}

export interface FindByEmailParams {
  email: string;
}

export interface UpdateUserPhotoParams {
  userId: string;
  filename: string;
}

export interface CreateRefreshTokenParams {
  userId: string;
  refreshToken: string;
  expiresIn: number
}

export type  FindByTokenParams = Prisma.RefreshTokenWhereUniqueInput & {
  refreshToken: string;

}

export interface DeleteRefreshTokenParams {
  userId: string;
}

export interface UsersRepository {
  create: (data: Prisma.UserCreateInput) => Promise<User>;
  findById: ({ userId }: FindByIdParams) => Promise<User | null>;
  findByEmail: ({ email }: FindByEmailParams) => Promise<User | null>;
  update: (data: Prisma.UserUpdateInput) => Promise<User | null>;
  updateUserPhoto: ({
    userId,
    filename,
  }: UpdateUserPhotoParams) => Promise<void>;

  createRefreshToken: ({
    expiresIn,
    refreshToken,
    userId,
  }: CreateRefreshTokenParams) => Promise<RefreshToken>;
  findByRefreshToken: ({refreshToken }: FindByTokenParams ) => Promise<{
    userId: string;
    expiresIn: number | null;
  } | null>;
  deleteRefreshToken: ({ userId }: DeleteRefreshTokenParams) => Promise<void>;
}
