import { ExerciseRepository } from "../repositories/exercise-repository";

interface FetchUserExercisesHistoryUseCaseRequest {
  userId: string;
}

interface ExerciseHistory {
  id: string;
  created_at: Date;
  user_id: string;
  exercise_id: string;
  exercise: {
    group: string;
    name: string;
  };
}

type FetchUserExercisesHistoryUseCaseResponse = ExerciseHistory[];

export class FetchUserExercisesHistoryUseCase {
  constructor(private exerciseRepository: ExerciseRepository) {}

  async execute({
    userId,
  }: FetchUserExercisesHistoryUseCaseRequest): Promise<FetchUserExercisesHistoryUseCaseResponse> {
    return this.exerciseRepository.findManyByUserId({ userId });
  }
}
