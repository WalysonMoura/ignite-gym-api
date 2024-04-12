import dayjs from "dayjs";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeFetchUserExercisesHistoryUseCase } from "../../../use-cases/factory/make-fetch-user-exercises-history";
import { z } from "zod";

export async function history(request: FastifyRequest, reply: FastifyReply) {
  try {
    const historySchema = z.object({
      id: z.string(),
    });

    const { id } = historySchema.parse(request.user);

    const fetchUserExercisesHistoryUseCase =
      makeFetchUserExercisesHistoryUseCase();

    const userExercisesHistory = await fetchUserExercisesHistoryUseCase.execute(
      { userId: id }
    );

    const days = userExercisesHistory.reduce((acc: string[], exercise: any) => {
      const day = dayjs(exercise.created_at).format("DD.MM.YYYY");
      if (!acc.includes(day)) {
        acc.push(day);
      }
      return acc;
    }, []);

    const exercisesByDay = days.map((day: string) => ({
      title: day,
      data: userExercisesHistory
        .filter(
          (exercise: any) =>
            dayjs(exercise.created_at).format("DD.MM.YYYY") === day
        )
        .map((exercise: any) => ({
          ...exercise,
          hour: dayjs(exercise.created_at).format("HH:mm"),
        })),
    }));

    return reply.send(exercisesByDay);
  } catch (error) {
    const historySchema = z.object({
      id: z.string(),
    });

    const { id } = historySchema.parse(request.user);
    // return reply.status(500).send({ error: "Internal Server Error" });
    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        error: error.message,
      });
    }
    throw error;
  }
}
