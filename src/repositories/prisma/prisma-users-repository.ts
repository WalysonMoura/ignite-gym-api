import { Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";


export class PrismaUsersRepository implements UsersRepository {
    async create(data: Prisma.UserCreateInput){


        const user = await p

        return user

    }
}