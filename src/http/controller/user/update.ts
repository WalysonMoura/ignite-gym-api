import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";

export async function update(request: FastifyRequest, reply: FastifyReply) {
  /* const updateBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    paswword: z.string().min(6),
    old_password: z.string().min(6).optional(),
  });

  //const _updateBodySchema = createBodySchema.safeParse(request.body);

  try {
    await updateBodySchema.parseAsync(request.body, {
      errorMap: (error) => {
        if (error.path[0] === "password" && error.message?.includes("length")) {
          return "A senha deve ter pelo menos 6 caracteres.";
        }
        return error.message || "Erro de validação.";
      },
    });

    const { name, password, old_password } = request.body;
    const userId = request.user.id;
    await updateUserUseCase.execute(userId, name, password, old_password);
    return response.json();
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessage = error.errors.map((err) => err.message).join("; ");
      return reply.status(400).send({ error: errorMessage });
    } else {
      return reply.status(400).send({ error: error || "Erro interno." });
    }
  }
 */}
