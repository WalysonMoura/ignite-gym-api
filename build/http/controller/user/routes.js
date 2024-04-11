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

// src/http/controller/user/routes.ts
var routes_exports = {};
__export(routes_exports, {
  userRoutes: () => userRoutes
});
module.exports = __toCommonJS(routes_exports);

// src/http/controller/user/create.ts
var import_zod = require("zod");
async function create(request, reply) {
  const createBodySchema = import_zod.z.object({
    name: import_zod.z.string(),
    email: import_zod.z.string().email(),
    paswword: import_zod.z.string().min(6)
  });
  const { email, name, paswword } = createBodySchema.parse(request.body);
}

// src/http/controller/user/update.ts
async function update(request, reply) {
}

// src/http/controller/user/refresh.ts
async function refresh(request, reply) {
}

// src/env/index.ts
var import_config = require("dotenv/config");
var import_zod2 = require("zod");
var envSchema = import_zod2.z.object({
  NODE_ENV: import_zod2.z.enum(["dev", "test", "production"]).default("dev"),
  JWT_SECRET: import_zod2.z.string(),
  ACCESS_TOKEN_EXPIRATION: import_zod2.z.string().default("10m"),
  PORT: import_zod2.z.coerce.number().default(3333)
});
var _env = envSchema.safeParse(process.env);
if (_env.success === false) {
  console.error("\u274CInvalid enviroment variables", _env.error.format());
  throw new Error("Invalid enviroment variables");
}
var env = _env.data;

// src/http/controller/user/authenticate.ts
var import_jsonwebtoken = require("jsonwebtoken");
var import_zod3 = require("zod");
async function authenticate(request, reply) {
  const authenticateSchemaBody = import_zod3.z.object({
    email: import_zod3.z.string().email(),
    password: import_zod3.z.string().min(6)
  });
  const { email, password } = authenticateSchemaBody.parse(request.body);
  try {
  } catch (error) {
  }
}

// src/http/controller/user/upload-avatar.ts
async function uploadAvatar(request, reply) {
}

// src/http/controller/user/routes.ts
async function userRoutes(app) {
  app.post("/users", create);
  app.put(
    "/users",
    /* { onRequest: [ensureAuthenticated] },  */
    update
  );
  app.patch("/users/avatar", uploadAvatar);
  app.post("/sessions", authenticate);
  app.post("/sessions/refresh-token", refresh);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  userRoutes
});
