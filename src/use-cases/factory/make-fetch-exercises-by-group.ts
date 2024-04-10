import { PrismaExerciseRepository } from "@/repositories/prisma/prisma-exercise-repository";
import { FetchExercisesByGroupUseCase } from "../fetch-exercises-by-group";

export function makeFetchExercisesByGroupUseCase() {
  const exerciseRepository = new PrismaExerciseRepository();
  const fetchExercisesByGroupUseCase = new FetchExercisesByGroupUseCase(
    exerciseRepository
  );

  return fetchExercisesByGroupUseCase;
}
