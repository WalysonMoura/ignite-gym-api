import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";

import { env } from "./env";
import swaggerDocument from "./lib/docs/swagger.json";
import { userRoutes } from "./http/controller/user/routes";

export const app = fastify({ logger: true });

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

//app.register(userRoutes);

const listeners = ["SIGINT", "SIGTERM"];
listeners.forEach((signal) => {
  process.on(signal, async () => {
    await app.close();
    process.exit(0);
  });
});
