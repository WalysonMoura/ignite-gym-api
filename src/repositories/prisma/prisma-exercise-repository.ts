import prisma from "@/lib/prisma";
import {
  ExerciseRepository,
  FindByIdParams,
  FindManyByGroupParams,
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
}
