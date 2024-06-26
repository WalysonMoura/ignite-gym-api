import { FastifyInstance } from "fastify";

//import fastifyStatic from "fastify-static";

import path from "path";
import { groups } from "./groups";
import { details } from "./details";
import { exercises } from "./exercises";
import { register } from "./register";
import { history } from "./history";

export async function exerciseRoutes(app: FastifyInstance) {
  const demoExercisePath = path.resolve(
    __dirname,
    "..",
    "..",
    "..",
    "..",
    "public",
    "gif"
  );

/*   app.register(fastifyStatic, {
    root: demoExercisePath,
    prefix: "/exercise/demo",
  });
 */
  const thumbExercisesPath = path.resolve(
    __dirname,
    "..",
    "..",
    "..",
    "public",
    "thumb"
  );

  /* app.register(fastifyStatic, {
    root: thumbExercisesPath,
    prefix: "/exercise/thumb",
  }); */

  //app.addHook("onRequest");

  app.get("/exercises/bygroup/:group", exercises);
  app.get("/exercises/:id", details);
 app.get("/groups", groups);

  app.get("/history", history);
  app.post("/history", register);
}
