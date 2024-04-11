import { makeFetchGroupsNameUseCase } from "../../../use-cases/factory/make-fetch-groups-name";
import { FastifyRequest, FastifyReply } from "fastify";

export async function groups(request: FastifyRequest, reply: FastifyReply) {
  try {
    const fetchGroupsNameUseCase = makeFetchGroupsNameUseCase();
    const groups = await fetchGroupsNameUseCase.execute();

    reply.status(201).send({ groups });
  } catch (error) {
    reply.status(400).send({ error });
  }
}
