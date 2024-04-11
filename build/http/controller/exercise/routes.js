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

// src/http/controller/exercise/routes.ts
var routes_exports = {};
__export(routes_exports, {
  exerciseRoutes: () => exerciseRoutes
});
module.exports = __toCommonJS(routes_exports);
var import_path = __toESM(require("path"));

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

// src/use-cases/errors/exercise-not-found.ts
var ExerciseNotFound = class extends Error {
  constructor() {
    super("Exerc\xEDcio n\xE3o encontrado.");
  }
};

// src/use-cases/get-exercise.ts
var GetExerciseUseCase = class {
  constructor(exerciseRepository) {
    this.exerciseRepository = exerciseRepository;
  }
  async execute({
    id
  }) {
    const exercise = await this.exerciseRepository.findById({ id });
    if (!exercise) {
      throw new ExerciseNotFound();
    }
    return { exercise };
  }
};

// src/use-cases/factory/make-get-exercise.ts
function makeGetExerciseUseCase() {
  const exerciseRepository = new PrismaExerciseRepository();
  const getExerciseUseCase = new GetExerciseUseCase(exerciseRepository);
  return getExerciseUseCase;
}

// src/http/controller/exercise/details.ts
var import_zod = require("zod");
async function details(request, reply) {
  try {
    const detailsParamsSchema = import_zod.z.object({
      id: import_zod.z.string()
    });
    const { id } = detailsParamsSchema.parse(request.params);
    const getExerciseUseCase = makeGetExerciseUseCase();
    const exerciseDetails = await getExerciseUseCase.execute({ id });
    reply.status(201).send({ exerciseDetails });
  } catch (error) {
    if (error instanceof import_zod.z.ZodError) {
      return reply.status(400).send({
        error: error.errors
      });
    }
  }
}

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
var import_zod2 = require("zod");
async function exercises(request, reply) {
  try {
    const exercisesParamsSchema = import_zod2.z.object({
      group: import_zod2.z.string()
    });
    const { group } = exercisesParamsSchema.parse(request.params);
    const fetchExercisesByGroupUseCase = makeFetchExercisesByGroupUseCase();
    const exercises2 = await fetchExercisesByGroupUseCase.execute({ group });
    reply.send(exercises2);
  } catch (error) {
    if (error instanceof import_zod2.z.ZodError) {
      return reply.status(400).send({
        error: error.errors
      });
    }
  }
}

// src/use-cases/register-exercise.ts
var RegisterExerciseUseCase = class {
  constructor(exerciseRepository) {
    this.exerciseRepository = exerciseRepository;
  }
  async execute({ exerciseId, userId }) {
    if (!exerciseId) {
      throw new Error("Informe o id do exerc\xEDcio.");
    }
    return await this.exerciseRepository.saveExercise({ exerciseId, userId });
  }
};

// src/use-cases/factory/make-register-exercise.ts
function makeRegisterExerciseUseCase() {
  const exerciseRepository = new PrismaExerciseRepository();
  const registerExerciseUseCase = new RegisterExerciseUseCase(exerciseRepository);
  return registerExerciseUseCase;
}

// src/http/controller/exercise/register.ts
var import_zod3 = require("zod");
async function register(request, reply) {
  try {
    const userId = request.user.sub;
    const registerCreateSchema = import_zod3.z.object({
      exercise_id: import_zod3.z.string()
    });
    const { exercise_id } = registerCreateSchema.parse(request.body);
    const registerExerciseUseCase = makeRegisterExerciseUseCase();
    await registerExerciseUseCase.execute({ exerciseId: exercise_id, userId });
    return reply.status(201).send();
  } catch (error) {
    if (error instanceof import_zod3.z.ZodError) {
      return reply.status(400).send({
        error: error.errors
      });
    }
    return reply.status(500).send({ error: "Internal Server Error" });
  }
}

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

// src/http/controller/exercise/routes.ts
async function exerciseRoutes(app) {
  const demoExercisePath = import_path.default.resolve(
    __dirname,
    "..",
    "..",
    "..",
    "..",
    "public",
    "gif"
  );
  app.register(require("fastify-static"), {
    root: demoExercisePath,
    prefix: "/exercise/demo"
  });
  const thumbExercisesPath = import_path.default.resolve(
    __dirname,
    "..",
    "..",
    "..",
    "public",
    "thumb"
  );
  app.register(require("fastify-static"), {
    root: thumbExercisesPath,
    prefix: "/exercise/thumb"
  });
  app.get("exercises/bygroup/:group", exercises);
  app.get("exercises/:id", details);
  app.get("/groups", groups);
  app.get("history/", history);
  app.post("history/", register);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  exerciseRoutes
});
