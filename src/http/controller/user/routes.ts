import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { create } from "./create";
import { update } from "./update";

import { refresh } from "./refresh";
import { authenticate } from "./authenticate";
import { uploadAvatar } from "./upload-avatar";

export async function userRoutes(app: FastifyInstance) {
  app.post("/users", create);
  app.put("/users",  update);
  app.patch("/users/avatar", uploadAvatar);

  app.post("/sessions", authenticate);
  app.post("/sessions/refresh-token", refresh);
}
