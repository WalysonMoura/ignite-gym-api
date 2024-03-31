import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import fastifySwagger from "@fastify/swagger"


import { env } from "./env";
import { swagger} from "./lib/docs/swagger";
import { userRoutes } from "./http/controller/user/routes";

export const app = fastify();

app.get("/", async (req, reply) => {
  return reply.status(200).type("text/html").send("Hello World");
});

app.register(fastifySwagger, {})

app.register(require('@fastify/swagger-ui'), {
  exposeRoute: true,
  routePrefix: '/api-docs', 
  swagger:
    swagger
  ,
});


app.ready(err => {
  if (err) throw err
  app.swagger()
})

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


app.register(userRoutes)