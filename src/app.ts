import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import fastifySwagger from "@fastify/swagger"


import { env } from "./env";
import { swaggerDocument } from "./lib/docs/swagger";

export const app = fastify();

app.get("/", async (req, reply) => {
  return reply.status(200).type("text/html").send("Hello World");
});

app.register(fastifySwagger, {})
app.register(require('@fastify/swagger-ui'), {
  routePrefix: '/api-docs', 
  swagger: {swaggerDocument}
});

/* app.register(require('@fastify/swagger-ui'), {
    routePrefix: '/docs',
    swagger: {
        info: {
            title: 'My FirstAPP Documentation',
            description: 'My FirstApp Backend Documentation description',
            version: '0.1.0',
            termsOfService: 'https://mywebsite.io/tos',
            contact: {
                name: 'John Doe',
                url: 'https://www.johndoe.com',
                email: 'john.doe@email.com'
            }
        },
        externalDocs: {
            url: 'https://www.johndoe.com/api/',
            description: 'Find more info here'
        },
        host: '127.0.0.1:3000',
        basePath: '',
        schemes: ['http', 'https'],
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [{
            name: 'User',
            description: 'User\'s API'
        }, ],
        definitions: {
            User: {
                type: 'object',
                required: ['id', 'email'],
                properties: {
                    id: {
                        type: 'number',
                        format: 'uuid'
                    },
                    firstName: {
                        type: 'string'
                    },
                    lastName: {
                        type: 'string'
                    },
                    email: {
                        type: 'string',
                        format: 'email'
                    }
                }
            },
        }
    },
   
}) */
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
