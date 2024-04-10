import { makeFetchExercisesByGroupUseCase } from "@/use-cases/factory/make-fetch-exercises-by-group";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function exercises(request: FastifyRequest, reply: FastifyReply) {
  try {
    const exercisesParamsSchema = z.object({
      group: z.string(),
    });

    const { group } = exercisesParamsSchema.parse(request.params);

    const fetchExercisesByGroupUseCase = makeFetchExercisesByGroupUseCase();

    const exercises = await fetchExercisesByGroupUseCase.execute({ group });

    reply.send(exercises);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        error: error.errors,
      });
    }
  }
}
