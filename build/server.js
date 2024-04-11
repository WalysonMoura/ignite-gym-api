"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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

// src/lib/docs/swagger.js
var require_swagger = __commonJS({
  "src/lib/docs/swagger.js"(exports2) {
    "use strict";
    exports2.options = {
      routePrefix: "/documentation",
      exposeRoute: true,
      swagger: {
        openapi: "3.0.0",
        info: {
          title: "Ignite Gym API",
          description: "API developed by Rodrigo Gon\xE7alves to be used in Ignite training in the mobile backend integration.",
          version: "1.0.0"
        },
        paths: {
          "/users": {
            post: {
              tags: ["User"],
              summary: "Create",
              description: "Create a new user",
              requestBody: {
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string"
                        },
                        email: {
                          type: "string"
                        },
                        password: {
                          type: "string"
                        }
                      },
                      example: {
                        name: "Rodrigo",
                        email: "rodrigo@email.com",
                        password: "123"
                      }
                    }
                  }
                }
              },
              responses: {
                "201": {
                  description: "Created"
                },
                "400": {
                  description: "Bad Request"
                }
              }
            },
            put: {
              tags: ["User"],
              summary: "Update",
              description: "Update user profile",
              requestBody: {
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                          required: false
                        },
                        password: {
                          type: "string",
                          required: false
                        },
                        old_password: {
                          type: "string",
                          required: false
                        }
                      },
                      example: {
                        name: "Rodrigo Gon\xE7alves",
                        password: "1234",
                        old_password: "123"
                      }
                    }
                  }
                }
              },
              responses: {
                "200": {
                  description: "Updated"
                },
                "400": {
                  description: "Bad Request"
                },
                "404": {
                  description: "User not found"
                }
              }
            }
          },
          "/users/avatar": {
            patch: {
              tags: ["User"],
              summary: "Upload",
              description: "Update user profile picture",
              requestBody: {
                content: {
                  "multipart/form-data": {
                    schema: {
                      type: "object",
                      properties: {
                        avatar: {
                          type: "string",
                          format: "base64"
                        }
                      },
                      example: {
                        avatar: "rodrigo.png"
                      }
                    },
                    encoding: {
                      avatar: {
                        contentType: "image/png, image/jpeg"
                      }
                    }
                  }
                }
              },
              responses: {
                "200": {
                  description: "Updated"
                },
                "400": {
                  description: "Bad Request"
                },
                "401": {
                  description: "Not authorized"
                }
              }
            }
          },
          "/sessions": {
            post: {
              tags: ["User"],
              summary: "Sign In",
              description: "User authentication",
              requestBody: {
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        email: {
                          type: "string"
                        },
                        password: {
                          type: "string"
                        }
                      },
                      example: {
                        email: "rodrigo@email.com",
                        password: "123"
                      }
                    }
                  }
                }
              },
              responses: {
                "201": {
                  description: "Authenticated",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        example: {
                          id: 1,
                          name: "Rodrigo Gon\xE7alves",
                          email: "rodrigo@email.com",
                          avatar: "346dab6b457abadbbb2a-49030804.jpg",
                          created_at: "2022-08-22 19:59:46",
                          updated_at: "2022-08-22T20:07:45.340Z"
                        }
                      }
                    }
                  }
                },
                "400": {
                  description: "Bad Request"
                },
                "401": {
                  description: "Not authorized/Invalid email or password"
                }
              }
            }
          },
          "/sessions/refresh-token": {
            post: {
              tags: ["User"],
              summary: "Refresh Token",
              description: "Auth Refresh Token",
              requestBody: {
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        token: {
                          type: "string"
                        }
                      },
                      example: {
                        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvZHJpZ29AZW1haWwuY29tIiwiaWF0IjoxNjYxMjc1NDAxLCJleHAiOjE2NjM4Njc0MDEsInN1YiI6IjEifQ.yQqqvmuZrF9ZM0LThzIu8dlwQtmuHdG0C_nwziXWyMo"
                      }
                    }
                  }
                }
              },
              responses: {
                "201": {
                  description: "Created",
                  content: {
                    "application/json": {
                      schema: {
                        type: "string",
                        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvZHJpZ29AZW1haWwuY29tIiwiaWF0IjoxNjYxMjc1NDE5LCJleHAiOjE2NjM4Njc0MTksInN1YiI6IjEifQ.kQoOrRyGvSkLcFS49ItDcLUEB7pEhbwyPRoEA5sR4ao"
                      }
                    }
                  }
                },
                "400": {
                  description: "Bad Request"
                },
                "404": {
                  description: "Refresh token not found"
                }
              }
            }
          },
          "/exercises": {
            get: {
              tags: ["Exercise"],
              summary: "Index",
              description: "List all exercises",
              requestBody: {
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      example: [
                        {
                          id: 16,
                          name: "Martelo em p\xE9",
                          series: 3,
                          repetitions: "10 a 12",
                          group: "b\xEDceps",
                          created_at: "2022-08-23 11:12:32",
                          updated_at: "2022-08-23 11:12:32"
                        },
                        {
                          id: 13,
                          name: "Rosca alternada com banco inclinado",
                          series: 4,
                          repetitions: "10 a 12",
                          group: "b\xEDceps",
                          created_at: "2022-08-23 11:12:32",
                          updated_at: "2022-08-23 11:12:32"
                        },
                        {
                          id: 15,
                          name: "Rosca direta barra reta",
                          series: 3,
                          repetitions: "10 a 12",
                          group: "b\xEDceps",
                          created_at: "2022-08-23 11:12:32",
                          updated_at: "2022-08-23 11:12:32"
                        },
                        {
                          id: 14,
                          name: "Rosca scott barra w",
                          series: 4,
                          repetitions: "10 a 12",
                          group: "b\xEDceps",
                          created_at: "2022-08-23 11:12:32",
                          updated_at: "2022-08-23 11:12:32"
                        }
                      ]
                    }
                  }
                }
              },
              responses: {
                "200": {
                  description: "Success"
                },
                "400": {
                  description: "Bad Request"
                }
              }
            }
          },
          "/exercises/{id}": {
            get: {
              tags: ["Exercise"],
              summary: "Index",
              description: "List all exercises",
              parameters: [
                {
                  in: "path",
                  name: "id",
                  required: true
                }
              ],
              requestBody: {
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      example: {
                        id: 1,
                        name: "Supino inclinado com barra",
                        series: 4,
                        repetitions: "10 a 12",
                        group: "peito",
                        created_at: "2022-08-23 11:12:32",
                        updated_at: "2022-08-23 11:12:32"
                      }
                    }
                  }
                }
              },
              responses: {
                "200": {
                  description: "Success"
                },
                "400": {
                  description: "Bad Request"
                }
              }
            }
          },
          "/groups": {
            get: {
              tags: ["Group"],
              summary: "Index",
              description: "List all groups",
              requestBody: {
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      example: [
                        "Trap\xE9zio",
                        "antebra\xE7o",
                        "b\xEDceps",
                        "costas",
                        "ombro",
                        "peito",
                        "pernas",
                        "tr\xEDceps"
                      ]
                    }
                  }
                }
              },
              responses: {
                "200": {
                  description: "Success"
                },
                "400": {
                  description: "Bad Request"
                }
              }
            }
          },
          "/history": {
            get: {
              tags: ["history"],
              summary: "Index",
              description: "List history by user",
              requestBody: {
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      example: [
                        {
                          id: 1,
                          user_id: 1,
                          exercise_id: 1,
                          name: "Supino inclinado com barra",
                          group: "peito",
                          created_at: "2022-08-23 11:55:29"
                        },
                        {
                          id: 2,
                          user_id: 1,
                          exercise_id: 2,
                          name: "Supino inclinado com barra",
                          group: "peito",
                          created_at: "2022-08-23 12:16:01"
                        }
                      ]
                    }
                  }
                }
              },
              responses: {
                "200": {
                  description: "Success"
                },
                "400": {
                  description: "Bad Request"
                }
              }
            },
            post: {
              tags: ["history"],
              summary: "Index",
              description: "Create user exercise history ",
              requestBody: {
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        exercise_id: {
                          type: "number"
                        }
                      },
                      example: [
                        {
                          id: 1,
                          user_id: 1,
                          exercise_id: 1,
                          name: "Supino inclinado com barra",
                          group: "peito",
                          created_at: "2022-08-23 11:55:29"
                        },
                        {
                          id: 2,
                          user_id: 1,
                          exercise_id: 2,
                          name: "Supino inclinado com barra",
                          group: "peito",
                          created_at: "2022-08-23 12:16:01"
                        }
                      ]
                    }
                  }
                }
              },
              responses: {
                "201": {
                  description: "Created"
                },
                "400": {
                  description: "Bad Request"
                }
              }
            }
          },
          "/files/${filename.png}": {
            get: {
              tags: ["Image"],
              summary: "Show",
              description: "Show image file",
              parameters: [
                {
                  in: "path",
                  name: "filename",
                  required: true
                }
              ],
              responses: {
                "200": {
                  description: "Success"
                },
                "400": {
                  description: "Bad Request"
                }
              }
            }
          }
        },
        externalDocs: {
          url: "https://swagger.io",
          description: "Find more info here"
        },
        host: "localhost",
        schemes: ["http"],
        consumes: ["application/json"],
        produces: ["application/json"]
      }
    };
  }
});

// src/app.ts
var import_jwt = __toESM(require("@fastify/jwt"));
var import_fastify = __toESM(require("fastify"));
var import_swagger = __toESM(require("@fastify/swagger"));

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

// src/http/controller/exercise/routes.ts
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
var import_zod2 = require("zod");
async function details(request, reply) {
  try {
    const detailsParamsSchema = import_zod2.z.object({
      id: import_zod2.z.string()
    });
    const { id } = detailsParamsSchema.parse(request.params);
    const getExerciseUseCase = makeGetExerciseUseCase();
    const exerciseDetails = await getExerciseUseCase.execute({ id });
    reply.status(201).send({ exerciseDetails });
  } catch (error) {
    if (error instanceof import_zod2.z.ZodError) {
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
var import_zod3 = require("zod");
async function exercises(request, reply) {
  try {
    const exercisesParamsSchema = import_zod3.z.object({
      group: import_zod3.z.string()
    });
    const { group } = exercisesParamsSchema.parse(request.params);
    const fetchExercisesByGroupUseCase = makeFetchExercisesByGroupUseCase();
    const exercises2 = await fetchExercisesByGroupUseCase.execute({ group });
    reply.send(exercises2);
  } catch (error) {
    if (error instanceof import_zod3.z.ZodError) {
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
var import_zod4 = require("zod");
async function register(request, reply) {
  try {
    const userId = request.user.sub;
    const registerCreateSchema = import_zod4.z.object({
      exercise_id: import_zod4.z.string()
    });
    const { exercise_id } = registerCreateSchema.parse(request.body);
    const registerExerciseUseCase = makeRegisterExerciseUseCase();
    await registerExerciseUseCase.execute({ exerciseId: exercise_id, userId });
    return reply.status(201).send();
  } catch (error) {
    if (error instanceof import_zod4.z.ZodError) {
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
async function exerciseRoutes(app2) {
  const demoExercisePath = import_path.default.resolve(
    __dirname,
    "..",
    "..",
    "..",
    "..",
    "public",
    "gif"
  );
  app2.register(require("fastify-static"), {
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
  app2.register(require("fastify-static"), {
    root: thumbExercisesPath,
    prefix: "/exercise/thumb"
  });
  app2.get("exercises/bygroup/:group", exercises);
  app2.get("exercises/:id", details);
  app2.get("/groups", groups);
  app2.get("history/", history);
  app2.post("history/", register);
}

// src/app.ts
var swagger = require_swagger();
var app = (0, import_fastify.default)({ logger: true });
app.register(import_swagger.default, swagger.options);
app.register(require("@fastify/swagger-ui"), {
  routePrefix: "/",
  exposeRoute: true
});
app.register(exerciseRoutes);
app.register(import_jwt.default, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: env.ACCESS_TOKEN_EXPIRATION
  },
  cookie: {
    cookieName: "refreshToken",
    signed: false
  }
});
var listeners = ["SIGINT", "SIGTERM"];
listeners.forEach((signal) => {
  process.on(signal, async () => {
    await app.close();
    process.exit(0);
  });
});

// src/server.ts
var startServer = async () => {
  try {
    await app.listen({
      host: "0.0.0.0",
      port: 3333
    });
    console.log("\u{1F680} HTTP Server Running!");
    app.swagger();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
startServer();
