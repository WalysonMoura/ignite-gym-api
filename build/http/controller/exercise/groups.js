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

// src/http/controller/exercise/groups.ts
var groups_exports = {};
__export(groups_exports, {
  groups: () => groups
});
module.exports = __toCommonJS(groups_exports);

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prismaClientSingleton = () => {
  return new import_client.PrismaClient();
};
var prisma = globalThis.prismaGlobal ?? prismaClientSingleton();
var prisma_default = prisma;
if (process.env.NODE_ENV !== "production")
  globalThis.prismaGlobal = prisma;

// src/repositories/prisma/prisma-exercise-repository.ts
var PrismaExerciseRepository = class {
  async findManyByGroup({ group }) {
    const groups2 = await prisma_default.exercise.findMany({
      where: {
        group
      },
      orderBy: { name: "asc" }
    });
    return groups2;
  }
  async findById({ id }) {
    const exercise = await prisma_default.exercise.findUnique({
      where: { id }
    });
    return exercise;
  }
  async findAllGroupsName() {
    const groups2 = await prisma_default.exercise.findMany({
      select: {
        group: true
      },
      distinct: ["group"],
      orderBy: {
        group: "asc"
      }
    });
    return groups2.map((item) => item.group);
  }
  async findManyByUserId({ userId }) {
    const exercises = prisma_default.history.findMany({
      where: {
        user_id: userId
      },
      include: {
        exercise: {
          select: {
            name: true,
            group: true
          }
        }
      },
      orderBy: {
        created_at: "desc"
      }
    });
    return exercises;
  }
  async saveExercise({ exerciseId, userId }) {
    await prisma_default.history.create({
      data: {
        user_id: userId,
        exercise_id: exerciseId
      }
    });
  }
};

// src/use-cases/fetch-groups-name.ts
var FetchGroupsNameUseCase = class {
  constructor(exerciseRepository) {
    this.exerciseRepository = exerciseRepository;
  }
  async execute() {
    const groups2 = await this.exerciseRepository.findAllGroupsName();
    return { groups: groups2 };
  }
};

// src/use-cases/factory/make-fetch-groups-name.ts
function makeFetchGroupsNameUseCase() {
  const exerciseRepository = new PrismaExerciseRepository();
  const fetchGroupsNameUseCase = new FetchGroupsNameUseCase(exerciseRepository);
  return fetchGroupsNameUseCase;
}

// src/http/controller/exercise/groups.ts
async function groups(request, reply) {
  try {
    const fetchGroupsNameUseCase = makeFetchGroupsNameUseCase();
    const groups2 = await fetchGroupsNameUseCase.execute();
    reply.status(201).send({ groups: groups2 });
  } catch (error) {
    reply.status(400).send({ error });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  groups
});
