import { ExerciseRepository } from "../repositories/exercise-repository";

interface FetchGroupUsesNameCaseResponse {
  groups: string[];
}
export class FetchGroupsNameUseCase {
  constructor(private exerciseRepository: ExerciseRepository) {}

  async execute(): Promise<FetchGroupUsesNameCaseResponse> {
    const groups = await this.exerciseRepository.findAllGroupsName();

    return { groups };
  }
}
