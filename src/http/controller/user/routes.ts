import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { create } from "./create";
import { update } from "./update";
import { ensureAuthenticated } from "@/http/middlewares/ensureAuthenticated";

export async function userRoutes(app: FastifyInstance) {
  app.post("/users", create);
  app.get("/users", create);

  app.put("/users", { onRequest: [ensureAuthenticated] }, update);
  app.patch("/user/avatar", update);
}
