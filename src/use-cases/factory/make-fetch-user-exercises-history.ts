
import { RegisterExerciseUseCase } from "../register-exercise";
import { FetchUserExercisesHistoryUseCase } from "../fetch-user-exercises-history";
import { PrismaExerciseRepository } from "../../repositories/prisma/prisma-exercise-repository";

export function makeFetchUserExercisesHistoryUseCase() {
  const exerciseRepository = new PrismaExerciseRepository();
  const fetchUserExercisesHistoryUseCase = new FetchUserExercisesHistoryUseCase(
    exerciseRepository
  );

  return fetchUserExercisesHistoryUseCase;
}
