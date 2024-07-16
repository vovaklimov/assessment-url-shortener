import { z } from "zod";

export const shortcutIdSchema = z.string().uuid();

export const createShortcutSchema = z.object({
  url: z.string().url(),
});

export const getShortcutSchema = z.object({
  id: shortcutIdSchema,
});

export const deleteShortcutSchema = z.object({
  id: shortcutIdSchema,
});
