import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";

import { env } from "./env";

export const app = fastify();

app.get("/", async (req, reply) => {
  return reply.status(200).type("text/html").send("Hello World");
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
