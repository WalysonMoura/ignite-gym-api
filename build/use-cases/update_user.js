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

// src/use-cases/update_user.ts
var update_user_exports = {};
__export(update_user_exports, {
  UpdateUserUseCase: () => UpdateUserUseCase
});
module.exports = __toCommonJS(update_user_exports);

// src/use-cases/errors/user-not-found.ts
var UserNotFound = class extends Error {
  constructor() {
    super("Usu\xE1rio n\xE3o encontrado.");
  }
};

// src/use-cases/update_user.ts
var import_bcryptjs = require("bcryptjs");

// src/use-cases/errors/old-password-not-conference.ts
var OldPasswordNotConference = class extends Error {
  constructor() {
    super("A senha antiga n\xE3o confere.");
  }
};

// src/use-cases/update_user.ts
var UpdateUserUseCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute({
    userId,
    name,
    email,
    oldPassword,
    password
  }) {
    const user = await this.usersRepository.findById({ userId });
    if (!user) {
      throw new UserNotFound();
    }
    if (password && oldPassword) {
      const checkOldPassaword = await (0, import_bcryptjs.compare)(oldPassword, user.password_hash);
      if (!checkOldPassaword) {
        throw new OldPasswordNotConference();
      }
      user.password_hash = await (0, import_bcryptjs.hash)(password, 6);
    }
    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    return {
      user
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UpdateUserUseCase
});
