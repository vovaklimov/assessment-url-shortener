import { randomUUID } from "node:crypto";
import { uuidToBase62 } from "../../shared/utils";
import type { ShortcutRepo } from "../../shared/types";

interface CreateShortcutParams {
  url: URL;
  shortcutLength?: number;
  shortcutRepo: ShortcutRepo;
}

export async function createShortcut({
  url,
  shortcutLength = 7,
  shortcutRepo,
}: CreateShortcutParams) {
  return shortcutRepo.create({
    url,
    shortcut: uuidToBase62(randomUUID()).slice(0, shortcutLength),
  });
}
