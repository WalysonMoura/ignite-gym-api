
import { Prisma, User } from "prisma/generated/client";


export interface UsersRepository {
    create: (data: Prisma.UserCreateInput) => Promise<User>
}