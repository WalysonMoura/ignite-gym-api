import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";

import fastifySwagger from "@fastify/swagger";

import { env } from "./env";
import path from "path";

const swagger = require("./lib/docs/swagger");

//import { userRoutes } from "./http/controller/user/routes";

export const app = fastify({ logger: true });

app.get("/", async (req, reply) => {
  return reply.status(200).type("text/html").send("Hello World");
});

///app.register(fastifySwagger, {})

app.register(fastifySwagger, swagger.options);
app.register(require("@fastify/swagger-ui"), {
  routePrefix: "/docs",
  exposeRoute: true,
  swagger: {
    info: {
      title: "Fastify API",
      description:
        "Building a blazing fast REST API with Node.js, MongoDB, Fastify and Swagger",
      version: "1.0.0",
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
                      type: "string",
                    },
                    email: {
                      type: "string",
                    },
                    password: {
                      type: "string",
                    },
                  },
                  example: {
                    name: "Rodrigo",
                    email: "rodrigo@email.com",
                    password: "123",
                  },
                },
              },
            },
          },
          responses: {
            "201": {
              description: "Created",
            },
            "400": {
              description: "Bad Request",
            },
          },
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
                      required: false,
                    },
                    password: {
                      type: "string",
                      required: false,
                    },
                    old_password: {
                      type: "string",
                      required: false,
                    },
                  },
                  example: {
                    name: "Rodrigo Gonçalves",
                    password: "1234",
                    old_password: "123",
                  },
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Updated",
            },
            "400": {
              description: "Bad Request",
            },
            "404": {
              description: "User not found",
            },
          },
        },
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
                      format: "base64",
                    },
                  },
                  example: {
                    avatar: "rodrigo.png",
                  },
                },
                encoding: {
                  avatar: {
                    contentType: "image/png, image/jpeg",
                  },
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Updated",
            },
            "400": {
              description: "Bad Request",
            },
            "401": {
              description: "Not authorized",
            },
          },
        },
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
                      type: "string",
                    },
                    password: {
                      type: "string",
                    },
                  },
                  example: {
                    email: "rodrigo@email.com",
                    password: "123",
                  },
                },
              },
            },
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
                      name: "Rodrigo Gonçalves",
                      email: "rodrigo@email.com",
                      avatar: "346dab6b457abadbbb2a-49030804.jpg",
                      created_at: "2022-08-22 19:59:46",
                      updated_at: "2022-08-22T20:07:45.340Z",
                    },
                  },
                },
              },
            },
            "400": {
              description: "Bad Request",
            },
            "401": {
              description: "Not authorized/Invalid email or password",
            },
          },
        },
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
                      type: "string",
                    },
                  },
                  example: {
                    token:
                      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvZHJpZ29AZW1haWwuY29tIiwiaWF0IjoxNjYxMjc1NDAxLCJleHAiOjE2NjM4Njc0MDEsInN1YiI6IjEifQ.yQqqvmuZrF9ZM0LThzIu8dlwQtmuHdG0C_nwziXWyMo",
                  },
                },
              },
            },
          },
          responses: {
            "201": {
              description: "Created",
              content: {
                "application/json": {
                  schema: {
                    type: "string",
                    example:
                      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvZHJpZ29AZW1haWwuY29tIiwiaWF0IjoxNjYxMjc1NDE5LCJleHAiOjE2NjM4Njc0MTksInN1YiI6IjEifQ.kQoOrRyGvSkLcFS49ItDcLUEB7pEhbwyPRoEA5sR4ao",
                  },
                },
              },
            },
            "400": {
              description: "Bad Request",
            },
            "404": {
              description: "Refresh token not found",
            },
          },
        },
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
                      name: "Martelo em pé",
                      series: 3,
                      repetitions: "10 a 12",
                      group: "bíceps",
                      created_at: "2022-08-23 11:12:32",
                      updated_at: "2022-08-23 11:12:32",
                    },
                    {
                      id: 13,
                      name: "Rosca alternada com banco inclinado",
                      series: 4,
                      repetitions: "10 a 12",
                      group: "bíceps",
                      created_at: "2022-08-23 11:12:32",
                      updated_at: "2022-08-23 11:12:32",
                    },
                    {
                      id: 15,
                      name: "Rosca direta barra reta",
                      series: 3,
                      repetitions: "10 a 12",
                      group: "bíceps",
                      created_at: "2022-08-23 11:12:32",
                      updated_at: "2022-08-23 11:12:32",
                    },
                    {
                      id: 14,
                      name: "Rosca scott barra w",
                      series: 4,
                      repetitions: "10 a 12",
                      group: "bíceps",
                      created_at: "2022-08-23 11:12:32",
                      updated_at: "2022-08-23 11:12:32",
                    },
                  ],
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Success",
            },
            "400": {
              description: "Bad Request",
            },
          },
        },
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
              required: true,
            },
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
                    updated_at: "2022-08-23 11:12:32",
                  },
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Success",
            },
            "400": {
              description: "Bad Request",
            },
          },
        },
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
                    "Trapézio",
                    "antebraço",
                    "bíceps",
                    "costas",
                    "ombro",
                    "peito",
                    "pernas",
                    "tríceps",
                  ],
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Success",
            },
            "400": {
              description: "Bad Request",
            },
          },
        },
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
                      created_at: "2022-08-23 11:55:29",
                    },
                    {
                      id: 2,
                      user_id: 1,
                      exercise_id: 2,
                      name: "Supino inclinado com barra",
                      group: "peito",
                      created_at: "2022-08-23 12:16:01",
                    },
                  ],
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Success",
            },
            "400": {
              description: "Bad Request",
            },
          },
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
                      type: "number",
                    },
                  },
                  example: [
                    {
                      id: 1,
                      user_id: 1,
                      exercise_id: 1,
                      name: "Supino inclinado com barra",
                      group: "peito",
                      created_at: "2022-08-23 11:55:29",
                    },
                    {
                      id: 2,
                      user_id: 1,
                      exercise_id: 2,
                      name: "Supino inclinado com barra",
                      group: "peito",
                      created_at: "2022-08-23 12:16:01",
                    },
                  ],
                },
              },
            },
          },
          responses: {
            "201": {
              description: "Created",
            },
            "400": {
              description: "Bad Request",
            },
          },
        },
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
              required: true,
            },
          ],
          responses: {
            "200": {
              description: "Success",
            },
            "400": {
              description: "Bad Request",
            },
          },
        },
      },
    },
    externalDocs: {
      url: "https://swagger.io",
      description: "Find more info here",
    },
    host: "localhost",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
  },
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: env.ACCESS_TOKEN_EXPIRATION,
  },
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
});

//app.register(userRoutes);

const listeners = ["SIGINT", "SIGTERM"];
listeners.forEach((signal) => {
  process.on(signal, async () => {
    await app.close();
    process.exit(0);
  });
});
//app.register(require("@fastify/cors"), {
// put your options here
/**
   *  origin: ['http://localhost:8080', 'http://127.0.0.1:8080', 'http://localhost:3000'],
    methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE']
   */
//});
