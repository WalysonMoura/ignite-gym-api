import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";

import fastifySwagger from "@fastify/swagger";

import { env } from "./env";

const swagger = require("./lib/docs/swagger");

//import { userRoutes } from "./http/controller/user/routes";

export const app = fastify({ logger: true });

app.get("/", async (req, reply) => {
  return reply.status(200).type("text/html").send("Hello World");
});

///app.register(fastifySwagger, {})
////app.register(require('@fastify/swagger-ui'), {})

app.register(fastifySwagger, swagger.options);

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
app.register(require("@fastify/cors"), {
  // put your options here
  /**
   *  origin: ['http://localhost:8080', 'http://127.0.0.1:8080', 'http://localhost:3000'],
    methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE']
   */
});
