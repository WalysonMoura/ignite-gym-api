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

// src/http/controller/user/authenticate.ts
var authenticate_exports = {};
__export(authenticate_exports, {
  authenticate: () => authenticate
});
module.exports = __toCommonJS(authenticate_exports);

// src/env/index.ts
var import_config = require("dotenv/config");
var import_zod = require("zod");
var envSchema = import_zod.z.object({
  NODE_ENV: import_zod.z.enum(["dev", "test", "production"]).default("dev"),
  JWT_SECRET: import_zod.z.string(),
  ACCESS_TOKEN_EXPIRATION: import_zod.z.string().default("10m"),
  PORT: import_zod.z.coerce.number().default(3333)
});
var _env = envSchema.safeParse(process.env);
if (_env.success === false) {
  console.error("\u274CInvalid enviroment variables", _env.error.format());
  throw new Error("Invalid enviroment variables");
}
var env = _env.data;

// src/http/controller/user/authenticate.ts
var import_jsonwebtoken = require("jsonwebtoken");
var import_zod2 = require("zod");
async function authenticate(request, reply) {
  const authenticateSchemaBody = import_zod2.z.object({
    email: import_zod2.z.string().email(),
    password: import_zod2.z.string().min(6)
  });
  const { email, password } = authenticateSchemaBody.parse(request.body);
  try {
  } catch (error) {
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  authenticate
});
