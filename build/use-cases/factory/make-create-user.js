"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/use-cases/factory/make-create-user.ts
var make_create_user_exports = {};
__export(make_create_user_exports, {
  makeCreateUser: () => makeCreateUser
});
module.exports = __toCommonJS(make_create_user_exports);

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prismaClientSingleton = () => {
  return new import_client.PrismaClient();
};
var prisma = globalThis.prismaGlobal ?? prismaClientSingleton();
var prisma_default = prisma;
if (process.env.NODE_ENV !== "production")
  globalThis.prismaGlobal = prisma;

// src/repositories/prisma/prisma-users-repository.ts
var PrismaUsersRepository = class {
  async create(data) {
    const user = await prisma_default.user.create({
      data
    });
    return user;
  }
  async findByEmail({ email }) {
    const user = await prisma_default.user.findUnique({
      where: {
        email
      }
    });
    return user;
  }
  async findById({ userId }) {
    const user = await prisma_default.user.findUnique({
      where: {
        id: userId
      }
    });
    return user;
  }
  async update(data) {
    const user = await prisma_default.user.update({
      where: {
        id: data.id
      },
      data
    });
    return user;
  }
  async updateUserPhoto({ userId, filename }) {
    await prisma_default.user.update({
      where: {
        id: userId
      },
      data: {
        avatar: filename
      }
    });
  }
  async createRefreshToken({
    expiresIn,
    refreshToken,
    userId
  }) {
    const RefreshToken = await prisma_default.refreshToken.create({
      data: {
        user_id: userId,
        refresh_token: refreshToken,
        expires_in: Number(new Date(expiresIn * 1e3))
      }
    });
    return RefreshToken;
  }
  async findByRefreshToken({ refreshToken }) {
    const RefreshToken = await prisma_default.refreshToken.findFirst({
      where: {
        refresh_token: refreshToken
      },
      select: {
        user_id: true,
        expires_in: true
      }
    });
    if (RefreshToken) {
      const { user_id, expires_in } = RefreshToken;
      if (expires_in !== null && user_id) {
        return {
          userId: user_id,
          expiresIn: expires_in
        };
      }
    }
    return null;
  }
  async deleteRefreshToken({ userId }) {
    await prisma_default.refreshToken.deleteMany({
      where: {
        id: userId
      }
    });
  }
};

// src/use-cases/create-user.ts
var import_bcryptjs = require("bcryptjs");

// src/use-cases/errors/user-already-exists.ts
var UserAlreadyExists = class extends Error {
  constructor() {
    super("Este e-mail j\xE1 est\xE1 em uso.");
  }
};

// src/use-cases/create-user.ts
var CreateUseUseCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute({
    email,
    name,
    password
  }) {
    const userWithSameEmail = await this.usersRepository.findByEmail({ email });
    if (userWithSameEmail) {
      throw new UserAlreadyExists();
    }
    const password_hash = await (0, import_bcryptjs.hash)(password, 6);
    const user = await this.usersRepository.create({
      email,
      name,
      password_hash
    });
    return {
      user
    };
  }
};

// src/use-cases/factory/make-create-user.ts
function makeCreateUser() {
  const usersRepository = new PrismaUsersRepository();
  const createUserUseCase = new CreateUseUseCase(usersRepository);
  return createUserUseCase;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  makeCreateUser
});
