import { z } from "zod";

export const shortcutIdSchema = z.string().min(1);

export const createShortcutSchema = z.object({
  url: z.string().url(),
});

export const deleteShortcutSchema = z.object({
  id: shortcutIdSchema,
});
