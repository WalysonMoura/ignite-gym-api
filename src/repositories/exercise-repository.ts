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
type FindManyByUserIdResult = Prisma.PrismaPromise<
  {
    exercise: {
      group: string;
      name: string;
    };
  } & {
    id: string;
    created_at: Date;
    user_id: string;
    exercise_id: string;
  }[]
>;
export interface ExerciseRepository {
  findManyByGroup: ({ group }: FindManyByGroupParams) => Promise<Exercise[]>;
  findById: ({ id }: FindByIdParams) => Promise<Exercise | null>;
  findAllGroupsName: () => Promise<string[]>;
  findManyByUserId: ({
    userId,
  }: FindManyByUserIdParams) => Promise<
    { exercise: { group: string; name: string } } & {
      id: string;
      created_at: Date;
      user_id: string;
      exercise_id: string;
    }
  >;
  saveExercise: ({ exerciseId, userId }: SaveExerciseParams) => Promise<void>;
}
