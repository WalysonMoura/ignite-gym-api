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

// src/use-cases/create-user.ts
var create_user_exports = {};
__export(create_user_exports, {
  CreateUseUseCase: () => CreateUseUseCase
});
module.exports = __toCommonJS(create_user_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateUseUseCase
});
