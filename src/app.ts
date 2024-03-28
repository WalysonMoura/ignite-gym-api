
import fastify from "fastify";

export const app = fastify();


app.get("/", async (req, reply) => {
  return reply.status(200).type("text/html").send("Hello World");
});


