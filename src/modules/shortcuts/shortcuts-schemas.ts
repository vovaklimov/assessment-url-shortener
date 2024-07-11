import { z } from "zod";

export const createShortcutSchema = z.object({
  url: z
    .string()
    .url()
    .transform((url) => new URL(url)),
});

export const deleteShortcutSchema = z.object({
  id: z.string(),
});
