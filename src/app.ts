import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";

import fastifySwagger from "@fastify/swagger";

import { env } from "./env";
import path from "path";

const swagger = require("./lib/docs/swagger");

//import { userRoutes } from "./http/controller/user/routes";

export const app = fastify({ logger: true });

/* app.get("/", async (req, reply) => {
  return reply.status(200).type("text/html").send("Hello World");
});
 */
///app.register(fastifySwagger, {})

app.register(fastifySwagger, swagger.options);
app.register(require("@fastify/swagger-ui"), {
  routePrefix: "/",
  exposeRoute: true,
  /* swagger: {
    openapi: "3.0.0",
    info: {
      title: "Ignite Gym API",
      description:
        "API developed by Rodrigo Gonçalves to be used in Ignite training in the mobile backend integration.",
      version: "1.0.0",
    },


    externalDocs: {
      url: "https://swagger.io",
      description: "Find more info here",
    },
    host: "localhost",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],

    definitions: {
      User: {
        type: "object",
        required: ["id", "email"],
        properties: {
          id: {
            type: "number",
            format: "uuid",
          },
          firstName: {
            type: "string",
          },
          lastName: {
            type: "string",
          },
          email: {
            type: "string",
            format: "email",
          },
        },
      },
    },
  }, */
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
