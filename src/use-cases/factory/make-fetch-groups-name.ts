
import { PrismaExerciseRepository } from "../../repositories/prisma/prisma-exercise-repository";
import { FetchGroupsNameUseCase } from "../fetch-groups-name";

export function makeFetchGroupsNameUseCase() {
  const exerciseRepository = new PrismaExerciseRepository();
  const fetchGroupsNameUseCase = new FetchGroupsNameUseCase(exerciseRepository);

  return fetchGroupsNameUseCase;
}
