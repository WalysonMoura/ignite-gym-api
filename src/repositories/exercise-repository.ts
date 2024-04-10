import { Exercise, History, Prisma } from "@prisma/client";

export interface FindByIdParams {
  id: string;
}

export interface FindManyByGroupParams {
  group: string;
}

export interface FindManyByUserIdParams {
  userId: string;
}

export interface SaveExerciseParams {
  userId: string;
  exerciseId: string;
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

type ExerciseHistoryList = ExerciseHistory[];

export interface ExerciseRepository {
  findManyByGroup: ({ group }: FindManyByGroupParams) => Promise<Exercise[]>;

  findById: ({ id }: FindByIdParams) => Promise<Exercise | null>;

  findAllGroupsName: () => Promise<string[]>;

  findManyByUserId: ({
    userId,
  }: FindManyByUserIdParams) => Promise<ExerciseHistoryList>;

  saveExercise: ({ exerciseId, userId }: SaveExerciseParams) => Promise<void>;
}
