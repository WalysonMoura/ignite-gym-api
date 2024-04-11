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

// src/use-cases/errors/user-already-exists.ts
var user_already_exists_exports = {};
__export(user_already_exists_exports, {
  UserAlreadyExists: () => UserAlreadyExists
});
module.exports = __toCommonJS(user_already_exists_exports);
var UserAlreadyExists = class extends Error {
  constructor() {
    super("Este e-mail j\xE1 est\xE1 em uso.");
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserAlreadyExists
});
