import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
//import { } from "@fastify/swagger-ui";
import { env } from "./env";
import fastifySwaggerUi from "@fastify/swagger-ui";
const swaggerDocument = require("./docs/swagger.json");

export const app = fastify();

app.get("/", async (req, reply) => {
  return reply.status(200).type("text/html").send("Hello World");
});

app.register(fastifySwaggerUi, {
  routePrefix: {
    routePrefix: "/api-docs", // Your desired route prefix
    staticCSP: '/*"', // This value is required
  },
  schema: swaggerDocument,
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
