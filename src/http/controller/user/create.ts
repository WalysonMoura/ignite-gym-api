import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    paswword: z.string().min(6),
  });

  const { email, name, paswword } = createBodySchema.parse(request.body);

  
}
