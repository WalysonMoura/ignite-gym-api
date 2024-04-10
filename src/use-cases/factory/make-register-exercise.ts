import { PrismaExerciseRepository } from "@/repositories/prisma/prisma-exercise-repository";
import { RegisterExerciseUseCase } from "../register-exercise";

export function makeRegisterExerciseUseCase() {
  const exerciseRepository = new PrismaExerciseRepository();
  const registerExerciseUseCase = new RegisterExerciseUseCase(exerciseRepository);

  return registerExerciseUseCase;
}
