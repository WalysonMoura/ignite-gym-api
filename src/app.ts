import fastifyCookie from "@fastify/cookie";
import fastify from "fastify";

export const app = fastify();

app.register(fastifyCookie);

app.get("/", async (req, reply) => {
  return reply.status(200).type("text/html").send("Hello World");
});
