import { FastifyInstance } from "fastify";

import path from "path";

export async function exerciseRoutes(app: FastifyInstance) {
  //app.addHook("onRequest");

  const demoExercisePath = path.resolve(
    __dirname,
    "..",
    "..",
    "..",
    "..",
    "public",
    "gif"
  );

  app.register(require("fastify-static"), {
    root: demoExercisePath,
    prefix: "/exercise/demo",
  });


  
  const thumbExercisesPath = path.resolve(
    __dirname,
    "..",
    "..",
    "..",
    "public",
    "thumb"
  );

  app.register(require("fastify-static"), {
    root: thumbExercisesPath,
    prefix: "/exercise/thumb",
  });
}
