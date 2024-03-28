import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
  JWT_SECRET: z.string(),
  ACCESS_TOKEN_EXPIRATION: z.string().default("10m"),
  PORT: z.coerce.number().default(3333),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("❌Invalid enviroment variables", _env.error.format());

  throw new Error("Invalid enviroment variables");
}

export const env = _env.data;
