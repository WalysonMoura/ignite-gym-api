
import prisma from "../../lib/prisma";
import {
  ExerciseRepository,
  FindByIdParams,
  FindManyByGroupParams,
  FindManyByUserIdParams,
  SaveExerciseParams,
} from "../exercise-repository";

export class PrismaExerciseRepository implements ExerciseRepository {
  async findManyByGroup({ group }: FindManyByGroupParams) {
    const groups = await prisma.exercise.findMany({
      where: {
        group,
      },
      orderBy: { name: "asc" },
    });

    return groups;
  }

  async findById({ id }: FindByIdParams) {
    const exercise = await prisma.exercise.findUnique({
      where: { id },
    });

    return exercise;
  }

  async findAllGroupsName() {
    const groups = await prisma.exercise.findMany({
      select: {
        group: true,
      },
      distinct: ["group"],
      orderBy: {
        group: "asc",
      },
    });

    return groups.map((item) => item.group);
  }

  async findManyByUserId({ userId }: FindManyByUserIdParams) {
    const exercises = prisma.history.findMany({
      where: {
        user_id: userId,
      },
      include: {
        exercise: {
          select: {
            name: true,
            group: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return exercises;
  }
  async saveExercise({ exerciseId, userId }: SaveExerciseParams) {
    await prisma.history.create({
      data: {
        user_id: userId,
        exercise_id: exerciseId,
      },
    });
  }
}
