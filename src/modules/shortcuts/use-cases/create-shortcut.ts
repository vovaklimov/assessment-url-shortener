import { randomUUID } from "node:crypto";
import { uuidToBase62 } from "../../shared/utils";
import type { ShortcutRepo, UrlShortcut } from "../../shared/types";

interface CreateShortcutParams {
  url: string;
  shortcutLength?: number;
  rootUrl: string;
  shortcutRepo: ShortcutRepo;
}

export async function createShortcut({
  url,
  shortcutLength = 7,
  shortcutRepo,
  rootUrl,
}: CreateShortcutParams): Promise<UrlShortcut> {
  const shortcut = await shortcutRepo.create({
    originalUrl: url,
    alias: uuidToBase62(randomUUID()).slice(0, shortcutLength),
  });

  return {
    ...shortcut,
    alias: `${rootUrl}/${shortcut.alias}`,
  };
}
