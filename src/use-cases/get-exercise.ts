
import { Exercise } from "@prisma/client";
import { ExerciseNotFound } from "./errors/exercise-not-found";
import { ExerciseRepository } from "../repositories/exercise-repository";

interface GetExerciseUseCaseRequest {
  id: string;
}

interface GetExerciseUseCaseResponse {
  exercise: Exercise;
}

export class GetExerciseUseCase {
  constructor(private exerciseRepository: ExerciseRepository) {}

  async execute({
    id,
  }: GetExerciseUseCaseRequest): Promise<GetExerciseUseCaseResponse> {
    const exercise = await this.exerciseRepository.findById({ id });

    if (!exercise) {
      throw new ExerciseNotFound();
    }

    return { exercise };
  }
}
