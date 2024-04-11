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

// src/use-cases/fetch-groups-name.ts
var fetch_groups_name_exports = {};
__export(fetch_groups_name_exports, {
  FetchGroupsNameUseCase: () => FetchGroupsNameUseCase
});
module.exports = __toCommonJS(fetch_groups_name_exports);
var FetchGroupsNameUseCase = class {
  constructor(exerciseRepository) {
    this.exerciseRepository = exerciseRepository;
  }
  async execute() {
    const groups = await this.exerciseRepository.findAllGroupsName();
    return { groups };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FetchGroupsNameUseCase
});
