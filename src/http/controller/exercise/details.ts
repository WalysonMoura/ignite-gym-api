import { makeGetExerciseUseCase } from "@/use-cases/factory/make-get-exercise";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function details(request: FastifyRequest, reply: FastifyReply) {
  try {
    const detailsParamsSchema = z.object({
      id: z.string(),
    });

    const { id } = detailsParamsSchema.parse(request.params);

    const getExerciseUseCase = makeGetExerciseUseCase();

    const exerciseDetails = await getExerciseUseCase.execute({ id });

    reply.status(201).send({ exerciseDetails });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        error: error.errors,
      });
    }
  }
}
