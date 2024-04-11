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

// src/http/controller/exercise/exercises.ts
var exercises_exports = {};
__export(exercises_exports, {
  exercises: () => exercises
});
module.exports = __toCommonJS(exercises_exports);

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
    const groups = await prisma_default.exercise.findMany({
      where: {
        group
      },
      orderBy: { name: "asc" }
    });
    return groups;
  }
  async findById({ id }) {
    const exercise = await prisma_default.exercise.findUnique({
      where: { id }
    });
    return exercise;
  }
  async findAllGroupsName() {
    const groups = await prisma_default.exercise.findMany({
      select: {
        group: true
      },
      distinct: ["group"],
      orderBy: {
        group: "asc"
      }
    });
    return groups.map((item) => item.group);
  }
  async findManyByUserId({ userId }) {
    const exercises2 = prisma_default.history.findMany({
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
    return exercises2;
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

// src/use-cases/fetch-exercises-by-group.ts
var FetchExercisesByGroupUseCase = class {
  constructor(exerciseRepository) {
    this.exerciseRepository = exerciseRepository;
  }
  async execute({
    group
  }) {
    const exercises2 = await this.exerciseRepository.findManyByGroup({
      group
    });
    return { exercises: exercises2 };
  }
};

// src/use-cases/factory/make-fetch-exercises-by-group.ts
function makeFetchExercisesByGroupUseCase() {
  const exerciseRepository = new PrismaExerciseRepository();
  const fetchExercisesByGroupUseCase = new FetchExercisesByGroupUseCase(
    exerciseRepository
  );
  return fetchExercisesByGroupUseCase;
}

// src/http/controller/exercise/exercises.ts
var import_zod = require("zod");
async function exercises(request, reply) {
  try {
    const exercisesParamsSchema = import_zod.z.object({
      group: import_zod.z.string()
    });
    const { group } = exercisesParamsSchema.parse(request.params);
    const fetchExercisesByGroupUseCase = makeFetchExercisesByGroupUseCase();
    const exercises2 = await fetchExercisesByGroupUseCase.execute({ group });
    reply.send(exercises2);
  } catch (error) {
    if (error instanceof import_zod.z.ZodError) {
      return reply.status(400).send({
        error: error.errors
      });
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  exercises
});
