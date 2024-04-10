import { PrismaExerciseRepository } from "@/repositories/prisma/prisma-exercise-repository";
import { GetExerciseUseCase } from "../get-exercise";

export function makeGetExerciseUseCase() {
  const exerciseRepository = new PrismaExerciseRepository();
  const getExerciseUseCase = new GetExerciseUseCase(exerciseRepository);

  return getExerciseUseCase;
}
