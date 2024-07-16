import { z } from "zod";

export type Config = z.infer<typeof configSchema>;

const configSchema = z.object({
  PORT: z.coerce.number().int().positive(),
  MONGODB_CONNECTION_STRING: z.string().url(),
  MY_URL: z.string().url(),
});

export const config = configSchema.parse(process.env);

export default config;
