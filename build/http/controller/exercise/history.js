"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/http/controller/exercise/history.ts
var history_exports = {};
__export(history_exports, {
  history: () => history
});
module.exports = __toCommonJS(history_exports);

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

// src/use-cases/fetch-user-exercises-history.ts
var FetchUserExercisesHistoryUseCase = class {
  constructor(exerciseRepository) {
    this.exerciseRepository = exerciseRepository;
  }
  async execute({
    userId
  }) {
    return this.exerciseRepository.findManyByUserId({ userId });
  }
};

// src/use-cases/factory/make-fetch-user-exercises-history.ts
function makeFetchUserExercisesHistoryUseCase() {
  const exerciseRepository = new PrismaExerciseRepository();
  const fetchUserExercisesHistoryUseCase = new FetchUserExercisesHistoryUseCase(
    exerciseRepository
  );
  return fetchUserExercisesHistoryUseCase;
}

// src/http/controller/exercise/history.ts
var import_dayjs = __toESM(require("dayjs"));
async function history(request, reply) {
  try {
    const userId = request.user.sub;
    const fetchUserExercisesHistoryUseCase = makeFetchUserExercisesHistoryUseCase();
    const userExercisesHistory = await fetchUserExercisesHistoryUseCase.execute(
      { userId }
    );
    const days = userExercisesHistory.reduce((acc, exercise) => {
      const day = (0, import_dayjs.default)(exercise.created_at).format("DD.MM.YYYY");
      if (!acc.includes(day)) {
        acc.push(day);
      }
      return acc;
    }, []);
    const exercisesByDay = days.map((day) => ({
      title: day,
      data: userExercisesHistory.filter(
        (exercise) => (0, import_dayjs.default)(exercise.created_at).format("DD.MM.YYYY") === day
      ).map((exercise) => ({
        ...exercise,
        hour: (0, import_dayjs.default)(exercise.created_at).format("HH:mm")
      }))
    }));
    return reply.send(exercisesByDay);
  } catch (error) {
    return reply.status(500).send({ error: "Internal Server Error" });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  history
});
