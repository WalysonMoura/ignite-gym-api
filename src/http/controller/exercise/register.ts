
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeRegisterExerciseUseCase } from "../../../use-cases/factory/make-register-exercise";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  try {
    const userId = request.user.sub;

    const registerCreateSchema = z.object({
      exercise_id: z.string(),
    });
    const { exercise_id } = registerCreateSchema.parse(request.body);

    const registerExerciseUseCase = makeRegisterExerciseUseCase();

    await registerExerciseUseCase.execute({ exerciseId: exercise_id, userId });

    return reply.status(201).send();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        error: error.errors,
      });
    }
    return reply.status(500).send({ error: "Internal Server Error" });
  }
}
