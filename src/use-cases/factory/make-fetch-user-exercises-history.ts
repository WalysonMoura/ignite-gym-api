import { PrismaExerciseRepository } from "@/repositories/prisma/prisma-exercise-repository";
import { RegisterExerciseUseCase } from "../register-exercise";
import { FetchUserExercisesHistoryUseCase } from "../fetch-user-exercises-history";

export function makeFetchUserExercisesHistoryUseCase() {
  const exerciseRepository = new PrismaExerciseRepository();
  const fetchUserExercisesHistoryUseCase = new FetchUserExercisesHistoryUseCase(
    exerciseRepository
  );

  return fetchUserExercisesHistoryUseCase;
}
