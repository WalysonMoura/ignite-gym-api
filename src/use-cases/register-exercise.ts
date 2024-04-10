import { ExerciseRepository } from "@/repositories/exercise-repository";

interface RegisterExerciseUseCaseRequest {
  userId: string;
  exerciseId: string;
}

export class RegisterExerciseUseCase {
  constructor(private exerciseRepository: ExerciseRepository) {}

  async execute({ exerciseId, userId }: RegisterExerciseUseCaseRequest) {
    if (!exerciseId) {
      throw new Error("Informe o id do exercício.");
    }

    return await this.exerciseRepository.saveExercise({ exerciseId, userId });
  }
}
