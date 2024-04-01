import { Exercise } from "@prisma/client";

export interface FindByIdParams {
  id: string;
}

export interface FindManyByGroupParams {
  group: string;
}

export interface ExerciseRepository {
  findManyByGroup: ({ group }: FindManyByGroupParams) => Promise<Exercise[]>;
  findById: ({ id }: FindByIdParams) => Promise<Exercise | null>;
  findAllGroups: () => Promise<string[]>;
}
