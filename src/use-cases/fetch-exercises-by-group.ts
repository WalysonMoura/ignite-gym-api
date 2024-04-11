
import { Exercise } from "@prisma/client";
import { ExerciseRepository } from "../repositories/exercise-repository";

interface FetchExercisesByGroupUseCaseRequest {
  group: string;
}

interface FetchExercisesByGroupUseCaseResponse {
  exercises: Exercise[];
}
export class FetchExercisesByGroupUseCase {
  constructor(private exerciseRepository: ExerciseRepository) {}

  async execute({
    group,
  }: FetchExercisesByGroupUseCaseRequest): Promise<FetchExercisesByGroupUseCaseResponse> {
    const exercises = await this.exerciseRepository.findManyByGroup({
      group,
    });

    return { exercises };
  }
}
