import type { ShortcutRepo } from "../../shared/types";

interface DeleteShortcutParams {
  id: string;
  shortcutRepo: ShortcutRepo;
}

export async function deleteShortcut({ id, shortcutRepo }: DeleteShortcutParams) {
  return shortcutRepo.delete(id);
}
