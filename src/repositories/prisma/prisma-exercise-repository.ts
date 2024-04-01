import prisma from "@/lib/prisma";
import {
  ExerciseRepository,
  FindByIdParams,
  FindManyByGroupParams,
} from "../exercise-repository";

export class PrismaExerciseRepository implements ExerciseRepository {
  async findManyByGroup({ group }: FindManyByGroupParams) {}

  async findById({ id }: FindByIdParams) {
    const exercise = await prisma.exercise.findUnique({
      where: { id },
    });

    return exercise;
  }
  
  async findAllGroups() {}
}
