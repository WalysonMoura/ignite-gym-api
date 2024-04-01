import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { create } from "./create";
import { update } from "./update";

export async function userRoutes(app: FastifyInstance) {
  app.post("/users", create);
  app.get("/users", create);


  app.put("/users", update);
  app.patch("/user/avatar", update);
}
